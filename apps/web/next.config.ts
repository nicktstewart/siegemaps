import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }] }];
  },
};
export default config;
