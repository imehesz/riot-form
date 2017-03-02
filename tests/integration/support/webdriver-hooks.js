'use strict'

const WebdriverIO = require('webdriverio')
const cucumber = require('cucumber')

const client = WebdriverIO.remote({
  host: 'localhost',
  desiredCapabilities: {
    browserName: 'firefox'
  }
})

const promised = client.init()

cucumber.defineSupportCode(function (support) {
  support.Before(function () {
    this.browser = client
    return promised
  })

  support.registerHandler('AfterFeatures', function (event, callback) {
    client.end().then(() => callback()).catch(callback)
  })
})
