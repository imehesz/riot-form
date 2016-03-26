import assert       from 'assert'
import Form         from './form'
import BaseInput    from './inputs/base'
import inputFactory from './input-factory'
import assign       from 'object-assign'

export default class FormBuilder {
  constructor(name) {
    assert(name, 'You must provide a name for the form')
    this._model = {}
    this._inputs = {}
    this._forms = {}
    this._name = name
  }

  addInput(input) {
    if (!(input instanceof BaseInput)) {
      input = inputFactory.create(input)
    }
    assert(input.name, 'You must provide an input name')
    this._inputs[input.name] = input
    return this
  }

  addInputs(inputs) {
    for (const input of inputs) {
      this.addInput(input)
    }
    return this
  }

  addNestedForm(form) {
    assert(form.name, 'A form must have a name')
    assert(form instanceof Form, 'A form must be instance of Form')
    form.name = this._name + '.' +  form.name
    this._forms[form.name] = form
    return this
  }

  setModel(model) {
    this._model = model
    return this
  }

  build(config = {}) {
    return new Form(assign({
      model: this._model,
      inputs: this._inputs,
      forms: this._forms,
      name: this._name
    }, config))
  }
}
