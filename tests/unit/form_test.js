import {expect}       from 'chai'
import {Form, inputs} from 'riot-form'

describe('Form', () => {
  it('should be observable', () => {
    expect(new Form({name: 'hello'}).on).to.be.a('function')
  })

  describe('inputs', () => {
    it('should be undefined when input does not exist', () => {
      const form = new Form.Builder('foo').build()
      expect(form.inputs.whatever).to.be.undefined
    })

    it('should return input when present', () => {
      const input = new inputs.TextInput({name: 'foo'})
      const form = new Form.Builder('foo').addInput(input).build()
      expect(form.inputs.foo).to.eq(input)
    })
  })


  it('should synchronize inputs', () => {
    const input = new inputs.TextInput({name: 'foo'})
    const form = new Form.Builder('foo').addInput(input).build()
    expect(form.model.foo).to.be.undefined
    input.value = 'bar'
    expect(form.model.foo).to.eq('bar')
  })

  it('should set input initial value', () => {
    const input = new inputs.TextInput({name: 'foo'})
    const form = new Form.Builder('foo').setModel({foo: 'bar'}).addInput(input).build()
    expect(form.model.foo).to.eq('bar')
    expect(input.value).to.eq('bar')
  })

  describe('model setter', () => {
    it('should update model', () => {
      const form = new Form.Builder('foo').setModel({foo: 'bar'}).build()
      expect(form.model.foo).to.eq('bar')
      form.model = { foo: 'baz' }
      expect(form.model.foo).to.eq('baz')
    })

    it('should update input values', () => {
      const input = new inputs.TextInput({name: 'foo'})
      const form = new Form.Builder('foo').setModel({foo: 'bar'}).addInput(input).build()
      expect(input.value).to.eq('bar')
      form.model = { foo: 'baz' }
      expect(input.value).to.eq('baz')
    })
  })

  describe('errors', () => {
    it('should return input errors', () => {
      const errors = ['I have an error']
      const input = new inputs.TextInput({
        name: 'foo',
        validate: (v) => errors
      })
      const form = new Form.Builder('foo').addInput(input).build()
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
      const form = new Form.Builder('foo').addInput(input).build()
      expect(form.errors.foo).to.be.undefined
      expect(form.valid).to.be.false
      expect(form.errors.foo).to.deep.eq(errors)
    })
  })
})
