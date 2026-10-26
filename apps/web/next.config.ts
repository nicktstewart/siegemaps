import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.siegemaps.com' }], destination: 'https://siegemaps.com/:path*', permanent: true }];
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }] }];
  },
};
export default config;
