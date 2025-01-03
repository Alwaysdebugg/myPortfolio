/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/myPortfolio',
  assetPrefix: '/myPortfolio',
}

module.exports = nextConfig 