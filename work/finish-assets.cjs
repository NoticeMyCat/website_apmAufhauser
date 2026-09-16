const fs=require('fs');
const data=fs.readFileSync('public/images/APM_AUFHAUSER_Logo1.png').toString('base64');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="480 70 470 440"><image width="1428" height="718" href="data:image/png;base64,${data}"/></svg>`;
fs.writeFileSync('public/images/brand-mark.svg',svg);
fs.writeFileSync('app/icon.svg',svg.replace('<image','<style>@media(prefers-color-scheme:dark){image{filter:brightness(1.7)}}</style><image'));
fs.copyFileSync('public/images/APM_AUFHAUSER_Logo1.png','app/apple-icon.png');
for(const p of ['components/site-header.tsx']){fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('/images/brand-mark.png','/images/brand-mark.svg'));}
const privacy='app/datenschutz/page.tsx';fs.writeFileSync(privacy,fs.readFileSync(privacy,'utf8').replace('verschlüsselten Prüfsumme','pseudonymisierten, mit einem geheimen Schlüssel berechneten Prüfsumme'));
