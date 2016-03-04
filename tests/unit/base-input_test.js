import {expect}    from 'chai'
import {BaseInput} from 'riot-form'

class DummyInput extends BaseInput {
  get defaultValue() {
    return 'dummy'
  }
}
DummyInput.defaultTag = 'dummy-tag'

describe('BaseInput', () => {
  it('should throw error when no name present', () => {
    expect(() => new DummyInput({})).to.throw(Error)
  })

  describe('new instances', () => {
    it('should accept value', () => {
      const input = new DummyInput({name: 'hello', value: 'foobar'})
      expect(input.value).to.eq('foobar')
    })

    it('should set value to default value', () => {
      const input = new DummyInput({name: 'hello'})
      expect(input.value).to.eq('dummy')
    })
  })

  describe('name', () => {
    it('should return config name', () => {
      const input = new DummyInput({name: 'hello'})
      expect(input.name).to.eq('hello')
    })
  })

  describe('value', () => {
    it('should trigger event on value changed', () => {
      const input = new DummyInput({name: 'hello'})
      let called = false
      const value = 'new value'
      input.on('change', (v) => {
        called = true
        expect(v).to.eq(value)
      })
      input.value = value
      expect(called).to.be.true
    })
  })

  describe('tag', () => {
    it('should return default tag when no tag given', () => {
      const input = new DummyInput({name: 'hello'})
      expect(input.tag).to.eq('dummy-tag')
    })

    it('should return config tag when given', () => {
      const input = new DummyInput({name: 'hello', tag: 'custom-tag'})
      expect(input.tag).to.eq('custom-tag')
    })
  })

  describe('process', () => {
    it('should be called when present', () => {
      const input = new DummyInput({
        name: 'hello',
        process: (v) => v.trim()
      })
      input.value = '  hello   '
      expect(input.value).to.eq('hello')
    })
  })

  describe('rawValue', () => {
    it('should not be processed', () => {
      const input = new DummyInput({
        name: 'hello',
        process: (v) => v.trim()
      })
      const v = '  hello   '
      input.value = v
      expect(input.rawValue).to.eq(v)
    })
  })

  describe('validate', () => {
    it('should be called when present', () => {
      const errors = ['should contain only numbers']
      const input = new DummyInput({
        name: 'hello',
        validate: (v) => /^[0-9]+/.exec(v) || errors
      })
      input.value = 'hello'
      expect(input.errors).to.deep.eq(errors)
    })
  })

  describe('formattedErrors', () => {
    it('should return error when it is string', () => {
      const errors = 'should contain only numbers'
      const input = new DummyInput({
        name: 'hello',
        validate: (_v) => errors
      })
      input.validate()
      expect(input.formattedErrors).to.eq(errors)
    })

    it('should return the first error when it is an array', () => {
      const errors = ['first', 'second']
      const input = new DummyInput({
        name: 'hello',
        validate: (_v) => errors
      })
      input.validate()
      expect(input.formattedErrors).to.eq(errors[0])
    })

    it('should use the formatErrors function when present', () => {
      const errors = ['first', 'second']
      const input = new DummyInput({
        name: 'hello',
        formatErrors: (err) => `** ${err[0]} **`,
        validate: (_v) => errors
      })
      input.validate()
      expect(input.formattedErrors).to.eq(`** ${errors[0]} **`)
    })
  })

  describe('.extends', () => {
    const MyInput = BaseInput.extend({
      myFunc: function () {
        return 'myResult'
      }
    })
    MyInput.type       = 'mine'
    MyInput.defaultTag = 'the-best-tag-ever'

    it('should enforce a name', () => {
      expect(() => new MyInput({})).to.throw(Error)
    })

    it('should have input properties', () => {
      const input = new MyInput({name: 'hello'})
      expect(input.name).to.eq('hello')
      expect(input.tag).to.eq('the-best-tag-ever')
    })

    it('should have defined functions', () => {
      const input = new MyInput({name: 'hello'})
      expect(input.myFunc()).to.eq('myResult')
    })
  })
})
