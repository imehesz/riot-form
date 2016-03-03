import {expect}                  from 'chai'
import {inputFactory, BaseInput} from 'riot-form'

class DummyInput extends BaseInput {}
DummyInput.type       = 'dummy'
DummyInput.defaultTag = 'dummy'

describe('inputFactory', () => {
  beforeEach(() => inputFactory.unregisterAll())

  describe('register', () => {
    it('should throw when no type given', () => {
      expect(() => inputFactory.register()).to.throw(Error)
    })

    it('should throw when no defaultTag given', () => {
      expect(() => inputFactory.register({ type: 'whatever' })).to.throw(Error)
    })

    it('should throw when not instance of BaseInput', () => {
      const props = { type: 'whatever', defaultTag: 'something' }
      expect(() => inputFactory.register(props)).to.throw(Error)
    })

    it('should register input', () => {
      expect(inputFactory.inputs.dummy).to.be.undefined
      inputFactory.register(DummyInput)
      expect(inputFactory.inputs.dummy).not.to.be.undefined
    })
  })

  describe('create', () => {
    it('should throw when no type given', () => {
      expect(() => inputFactory.create({name: 'hello'})).to.throw(Error)
    })

    it('should throw when input not available', () => {
      expect(() => inputFactory.create({name: 'hello', type: 'whatever'})).to.throw(Error)
    })

    it('should return input instance when it exists', () => {
      inputFactory.register(DummyInput)
      const input = inputFactory.create({type: 'dummy', name: 'hello'})
      expect(input).to.be.instanceof(DummyInput)
      expect(input.name).to.eq('hello')
    })
  })
})
