import {expect} from 'chai'
import {inputs} from 'riot-form'

describe('DateInput', () => {
  describe('preProcessValue', () => {
    it('should return a formatted date', () => {
      const input = new inputs.DateInput({name: 'whatever'})
      expect(input.preProcessValue('2016-08-06T06:15:38.864Z')).to.eq('2016-08-06')
      expect(input.preProcessValue('2016-08-31T06:15:38.864Z')).to.eq('2016-08-31')
    })
  })
})
