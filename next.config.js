const withCSS = require('@zeit/next-css')
const dotenv = require('dotenv')

dotenv.config()

module.exports = withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
