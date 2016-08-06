import {expect}       from 'chai'
import {inputFactory} from 'riot-form'

describe('inputs', () => {
  const inputTypes = [
    'text',
    'password',
    'email',
    'tel',
    'number',
    'url',
    'date',
    'textarea'
  ]

  it('should contain all inputs', () => {
    for (const inputType of inputTypes) {
      expect(() => inputFactory.create({name: 'hello', type: inputType})).not.to.throw(Error)
    }
  })

  describe('DateInput', () => {
    describe('preProcessValue', () => {
      it('should return a formatted date', () => {
        const input = inputFactory.create({name: 'whatever', type: 'date'})
        expect(input.preProcessValue('2016-08-06T06:15:38.864Z')).to.eq('2016-08-06')
        expect(input.preProcessValue('2016-08-31T06:15:38.864Z')).to.eq('2016-08-31')
      })
    })
  })

  describe('NumberInput', () => {
    describe('preProcessValue', () => {
      it('should return a number', () => {
        const input = inputFactory.create({name: 'whatever', type: 'number'})
        expect(input.preProcessValue('1')).to.eq(1)
        expect(input.preProcessValue('1.1')).to.eq(1.1)
      })
    })
  })
})
