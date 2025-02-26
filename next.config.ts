import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 匹配 /api 开头的请求
        destination: 'http://localhost:4065/api/:path*' // 代理到目标 API 这里一定要加上:path*
      }
    ];
  }
};

export default nextConfig;
