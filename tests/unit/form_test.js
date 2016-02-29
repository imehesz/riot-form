import {expect}       from 'chai'
import {Form, inputs} from '../..'

describe('Form', () => {
  it('should be observable', () => {
    expect(new Form().on).to.be.a('function')
  })

  it('should synchronize inputs', () => {
    const input = new inputs.TextInput({name: 'foo'})
    const form = new Form.Builder().addInput(input).build()
    expect(form.model.foo).to.be.undefined
    input.value = 'bar'
    expect(form.model.foo).to.eq('bar')
  })

  it('should set input initial value', () => {
    const input = new inputs.TextInput({name: 'foo'})
    const form = new Form.Builder().setModel({foo: 'bar'}).addInput(input).build()
    expect(form.model.foo).to.eq('bar')
    expect(input.value).to.eq('bar')
  })

  describe('errors', () => {
    it('should return input errors', () => {
      const errors = ['I have an error']
      const input = new inputs.TextInput({
        name: 'foo',
        validate: (v) => errors
      })
      const form = new Form.Builder().addInput(input).build()
      input.value = 'bar'
      expect(form.model.foo).to.eq('bar')
      expect(form.errors.foo).to.deep.eq(errors)
    })
  })

  describe('valid', () => {
    it('should run input validators', () => {
      const errors = ['I have an error']
      const input = new inputs.TextInput({
        name: 'foo',
        validate: (v) => errors
      })
      const form = new Form.Builder().addInput(input).build()
      expect(form.errors.foo).to.be.undefined
      expect(form.valid).to.be.false
      expect(form.errors.foo).to.deep.eq(errors)
    })
  })

  describe('getInput', () => {
    it('should throw when input does not exist', () => {
      const form = new Form.Builder().build()
      expect(() => form.getInput('whatever')).to.throw(Error)
    })

    it('should return input when present', () => {
      const input = new inputs.TextInput({name: 'foo'})
      const form = new Form.Builder().addInput(input).build()
    })
  })
})
