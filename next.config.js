/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/myPortfolio',
  assetPrefix: '/myPortfolio',
  trailingSlash: true,
}

module.exports = nextConfig 