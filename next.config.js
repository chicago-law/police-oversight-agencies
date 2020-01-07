const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dotenv.config()

module.exports = withBundleAnalyzer(withCSS({
  // This is awesome but still experimental according to Next.
  // Revisit in the future!
  // experimental: {
  //   granularChunks: true,
  // },
  webpack(config) {
    const originalEntry = config.entry
    // eslint-disable-next-line
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js']
        && entries['main.js'].indexOf('./polyfills.js') === -1
      ) {
        entries['main.js'].unshift('./polyfills.js')
      }
      return entries
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}))
