import { ImageResponse } from 'next/og';

export const alt = 'SiegeMaps';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f4f7f5', color: '#111b16', padding: 80, flexDirection: 'column', justifyContent: 'center', borderTop: '16px solid #00ba83' }}>
      <div style={{ display: 'flex', fontSize: 100, fontWeight: 700, letterSpacing: -5 }}>SiegeMaps</div>
      <div style={{ display: 'flex', width: 120, height: 8, background: '#00ba83', marginTop: 28, marginBottom: 38 }} />
      <div style={{ display: 'flex', fontSize: 34, color: '#59665e' }}>Rainbow Six Siege</div>
      <div style={{ display: 'flex', fontSize: 25, marginTop: 12, color: '#006c4b' }}>siegemaps.com</div>
    </div>, size,
  );
}
