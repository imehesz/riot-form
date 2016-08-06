import {expect}  from 'chai'
import * as util from 'riot-form/util'

describe('util', () => {
  describe('capitalize', () => {
    it('should capitalize the string', () => {
      expect(util.capitalize('foobar')).to.eq('Foobar')
      expect(util.capitalize('Foobar')).to.eq('Foobar')
      expect(util.capitalize('hellOO')).to.eq('HellOO')
    })
  })

  describe('padLeft', () => {
    it('should pad string', () => {
      expect(util.padLeft('1', 2, '0')).to.eq('01')
      expect(util.padLeft('ab', 4, 'x')).to.eq('xxab')
    })
  })
})
