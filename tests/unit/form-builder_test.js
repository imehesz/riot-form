import {expect}       from 'chai'
import {Form, inputs} from 'riot-form'

describe('FormBuilder', () => {
  it('should build a form', () => {
    expect(new Form.Builder('hello').build()).to.be.instanceof(Form)
  })

  it('should throw when no named passed', () => {
    expect(() => new Form.Builder()).to.throw(Error)
  })

  it('should throw when input do not have a name', () => {
    const builder = new Form.Builder('whatever')
    expect(() => builder.addInput({type: 'text'})).to.throw(Error)
  })

  it('should raise on inexisting input type', () => {
    const builder = new Form.Builder('whatever')
    expect(() => builder.addInput({type: 'wtf', name: 'foo'})).to.throw(Error)
  })

  describe('setModel', () => {
    it('should set model', () => {
      const form = new Form.Builder('foo')
              .setModel({name: 'foo'})
              .build()
      expect(form.model.name).to.eq('foo')
    })
  })

  describe('addInput', () => {
    it('should add input from plain objects', () => {
      const name = 'hello'
      const form = new Form.Builder('foo')
              .addInput({name: name, type: 'text'})
              .build()
      expect(form.inputsCount).to.eq(1)
      expect(form.inputs.hello.name).to.eq(name)
      expect(form.inputs.hello.formName).to.eq('foo')
    })

    it('should add input from input objects', () => {
      const form = new Form.Builder('foo')
              .addInput(new inputs.TextInput({name: 'hello'}))
              .build()
      expect(form.inputsCount).to.eq(1)
      expect(form.inputs.hello.name).to.eq('hello')
      expect(form.inputs.hello.formName).to.eq('foo')
    })
  })

  describe('addInputs', () => {
    it('should add multiple inputs', () => {
      const form = new Form.Builder('foo')
              .addInputs([
                {name: 'foo', type: 'text'},
                {name: 'bar', type: 'text'}
              ])
              .build()

      expect(form.inputsCount).to.eq(2)
      expect(form.inputs.foo.name).to.eq('foo')
    })
  })

  describe('addNestedForm', () => {
    it('should throw when form is not Form instance', () => {
      const builder = new Form.Builder('foo')
      expect(() => builder.addNestedForm({name: 'hello'})).to.throw(Error)
    })


    it('should add nested form', () => {
      const form = new Form.Builder('foo')
              .addNestedForm(
                new Form.Builder('bar')
                  .addInput({name: 'baz', type: 'text'})
                  .build())
              .build()
      expect(form.forms.bar.inputsCount).to.eq(1)
      expect(form.forms.bar.name).to.eq('bar')
      expect(form.forms.bar.fullName).to.eq('foo.bar')
      expect(form.forms.bar.inputs.baz.name).to.eq('baz')
      expect(form.forms.bar.inputs.baz.formName).to.eq('foo.bar')
    })
  })

  it('should create a form with value prefilled', () => {
    const form = new Form.Builder('foo')
            .addInput({name: 'name', type: 'text'})
            .setModel({name: 'Daniel'})
            .build()

    expect(form.inputs.name.value).to.eq('Daniel')
    expect(form.model).to.deep.eq({name: 'Daniel'})
  })
})
