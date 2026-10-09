import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Load the real route without a Next server. Every fetch is replaced below;
// these tests cannot contact Resend or send a message.
const moduleUrl = source => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText).toString('base64');
const contact = moduleUrl(await readFile(new URL('../lib/contact.ts', import.meta.url), 'utf8'));
const settings = moduleUrl((await readFile(new URL('../lib/contact-settings.ts', import.meta.url), 'utf8')).replace('"./contact"', JSON.stringify(contact)));
const route = moduleUrl((await readFile(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8'))
  .replace('"@/lib/contact"', JSON.stringify(contact))
  .replace('"@/lib/contact-settings"', JSON.stringify(settings)));
const { POST } = await import(route);
const data = {firstName:'René',lastName:'Test',email:'visitor@example.com',phone:'+43 123456',message:'Eine Terminanfrage'};
let address = 0;
const request = () => new Request('https://practice.example/api/contact', {
  method:'POST', headers:{'content-type':'application/json',origin:'https://practice.example','x-vercel-forwarded-for':`192.0.2.${++address}`},
  body:JSON.stringify({...data,to:'attacker@example.com'}),
});

test.beforeEach(t => {
  const previous = {...process.env};
  for(const key of ['APM_RESEND_API_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','CONTACT_RATE_SECRET']) delete process.env[key];
  Object.assign(process.env,{RESEND_API_KEY:'test-only',CONTACT_TO_EMAIL:'practice@example.com',EMAIL_FROM:'Practice <mail@example.com>',CONTACT_FORM_ENABLED:'true'});
  t.after(() => { for(const key of Object.keys(process.env)) if(!(key in previous)) delete process.env[key]; Object.assign(process.env,previous); });
  t.mock.method(globalThis,'fetch',async()=>{throw new Error('Unexpected network call blocked');});
  t.mock.method(console,'info',()=>{});
  t.mock.method(console,'error',()=>{});
});

test('real route builds the Resend request and confirms provider acceptance',async t=>{
  let calls=0;
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    calls++;
    assert.equal(url,'https://api.resend.com/emails');
    assert.equal(options.method,'POST');
    assert.equal(options.headers.Authorization,'Bearer test-only');
    const mail=JSON.parse(options.body);
    assert.equal(mail.to,'practice@example.com');
    assert.equal(mail.from,'Practice <mail@example.com>');
    assert.equal(mail.reply_to,data.email);
    assert.ok(mail.text.includes(data.message));
    assert.ok(mail.text.includes(data.phone));
    return Response.json({id:'mock-email-id'});
  });
  const response=await POST(request());
  assert.equal(response.status,200);
  assert.deepEqual(await response.json(),{ok:true});
  assert.equal(calls,1);
});

for(const [name,result] of [
  ['provider rejects credentials',()=>Response.json({name:'validation_error'},{status:403})],
  ['provider returns no email id',()=>Response.json({})],
  ['provider returns non-JSON',()=>new Response('unavailable',{status:502})],
  ['provider times out',()=>{throw new DOMException('Timed out','TimeoutError');}],
]) test(name,async t=>{
  t.mock.method(globalThis,'fetch',async()=>result());
  const response=await POST(request());
  assert.equal(response.status,502);
  assert.equal(typeof (await response.json()).error,'string');
});

test('distributed rate limit rejection prevents any mail request',async t=>{
  Object.assign(process.env,{UPSTASH_REDIS_REST_URL:'https://rate.example',UPSTASH_REDIS_REST_TOKEN:'test-rate',CONTACT_RATE_SECRET:'test-secret'});
  let calls=0;
  t.mock.method(globalThis,'fetch',async(url)=>{calls++;assert.equal(url,'https://rate.example');return Response.json({result:0});});
  assert.equal((await POST(request())).status,429);
  assert.equal(calls,1);
});
