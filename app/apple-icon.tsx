import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export default async function Icon() {
  const logo = await readFile(join(process.cwd(), 'public/images/APM_AUFHAUSER_Logo1.png'));
  return new ImageResponse(<div style={{display:'flex',width:180,height:180,background:'#f6f3ef',overflow:'hidden',position:'relative'}}><img alt="" src={`data:image/png;base64,${logo.toString('base64')}`} width={514} height={258} style={{position:'absolute',left:-166,top:-18,maxWidth:514}} /></div>, size);
}
