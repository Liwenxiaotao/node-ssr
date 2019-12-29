const { resolve } = require('path')
const _= require('lodash')
let config = {
  viewDir: resolve(__dirname, '..', 'views'),
  staticDir: resolve(__dirname, '..', 'assets')
}

if (false) {

}

if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    ip: '127.0.0.1',
    port: 3000
  }
  config = _.extend(config, devConfig)
}

if (process.env.NODE_ENV === 'production') {
  const proConfig = {
    port: 80
  }
  config = _.extend(config, proConfig)
}

module.exports = config