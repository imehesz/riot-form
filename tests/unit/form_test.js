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

  describe('forms', () => {
    it('should be undefined when form does not exist', () => {
      const form = new Form.Builder('foo').build()
      expect(form.forms.whatever).to.be.undefined
    })

    it('should return form when present', () => {
      const nestedForm = new Form.Builder('bar').build()
      const form = new Form.Builder('foo').addNestedForm(nestedForm).build()
      expect(form.forms.bar).to.be.eq(nestedForm)
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

  it('should set form initial value', () => {
    const nestedForm = new Form.Builder('bar').build()
    const form = new Form.Builder('foo').setModel({bar: {name: 'baz'}})
                  .addNestedForm(nestedForm).build()
    expect(form.model.bar).to.deep.eq({name: 'baz'})
    expect(nestedForm.model).to.deep.eq({name:'baz'})
    expect(nestedForm.model.name).to.eq('baz')
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

    it('should update form models', () => {
      const nestedForm = new Form.Builder('bar').build()
      const form = new Form.Builder('foo').setModel({bar: {name: 'bar'}})
                    .addNestedForm(nestedForm).build()
      expect(nestedForm.model).to.deep.eq({name:'bar'})
      form.model = {bar: {name: 'baz'}}
      expect(nestedForm.model).to.deep.eq({name:'baz'})
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
