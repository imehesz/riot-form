'use strict'

const WebdriverIO = require('webdriverio')

const client = WebdriverIO.remote({
  host: 'localhost',
  desiredCapabilities: {
    browerName: 'firefox'
  }
})

const promised = client.init()

module.exports = function () {
  this.Before(function () {
    this.browser = client
    return promised
  })

  this.registerHandler('AfterFeatures', function (event, callback) {
    client.end()
    callback()
  })
}
