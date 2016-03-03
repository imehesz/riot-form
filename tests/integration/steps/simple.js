'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

module.exports = function () {
  this.Given(/^I visit the simple test page$/, function () {
    return this.browser.url('http://localhost:5050/simple.html')
  })

  this.When(/^I enter ([^\"]*) \"([^\"]*)\"$/, function (property, value) {
    return this.browser.setValue('[name="simple_' + property + '"]', value)
  })

  this.Then(/^I should see ([^\"]*) \"([^\"]*)\"$/, function (property, expected) {
    return expect(this.browser.getText('.' + property)).to.eventually.eq(expected)
  })
}
