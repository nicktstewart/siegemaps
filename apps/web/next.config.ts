import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: [{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }] },
      { source: '/maps/:mapId/:file([a-z0-9-]+\\.webp)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};
export default config;
