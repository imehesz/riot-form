'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

var cucumber = require('cucumber')

cucumber.defineSupportCode(function (support) {
  support.Given(/^I visit the simple test page$/, function () {
    return this.browser.url('http://localhost:5050/simple.html')
  })

  support.When(/^I enter ([^\"]*) \"([^\"]*)\"$/, function (property, value) {
    return this.browser.setValue('[name="simple_' + property + '"]', value)
  })

  support.Then(/^I should see ([^\"]*) \"([^\"]*)\"$/, function (property, expected) {
    return Promise.all([
      expect(this.browser.getValue('[name="simple_' + property + '"]')).to.eventually.eq(expected),
      expect(this.browser.getText('.' + property)).to.eventually.eq(expected)
    ])
  })

  support.When(/^I press reset button$/, function () {
    return this.browser.click('#reset-button')
  })

  support.Then(/^I should see empty form$/, function () {
    return expect(this.browser.getValue('[name="simple_username"]')).to.eventually.eq('')
  })
})
