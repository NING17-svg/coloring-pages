import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dashscope-result-bj.oss-cn-beijing.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
