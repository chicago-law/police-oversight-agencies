// eslint-disable-next-line
const withCSS = require('@zeit/next-css')
// (This is here so we can import normalize.css in _app.tsx)

module.exports = withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
