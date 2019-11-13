const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dotenv.config()

module.exports = withBundleAnalyzer(withCSS({
  // This is awesome but still experimental according to Next.
  // Revisit in the future!
  experimental: {
    granularChunks: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}))
