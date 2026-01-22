/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 部署：使用服务器端渲染，支持 API 路由
  // GitHub Pages 部署：设置 BUILD_STATIC=true 进行静态导出
  ...(process.env.BUILD_STATIC === "true" && { output: "export" }),
  // 仅在 GitHub Pages 部署时使用 basePath
  ...(process.env.BUILD_STATIC === "true" &&
    process.env.NEXT_PUBLIC_BASE_PATH && {
      basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    }),
  images: {
    unoptimized: process.env.BUILD_STATIC === "true",
  },
};

module.exports = nextConfig;
