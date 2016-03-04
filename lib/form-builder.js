import assert       from 'assert'
import Form         from './form'
import BaseInput    from './inputs/base'
import inputFactory from './input-factory'

export default class FormBuilder {
  constructor(name) {
    assert(name, 'You must provide a name for the form')
    this._model = {}
    this._inputs = {}
    this._name = name
  }

  addInput(input) {
    if (!(input instanceof BaseInput)) {
      input = inputFactory.create(input)
    }
    assert(input.name, 'You must provide an input name')
    input.formName = this._name
    this._inputs[input.name] = input
    return this
  }

  addInputs(inputs) {
    for (const input of inputs) {
      this.addInput(input)
    }
    return this
  }

  setModel(model) {
    this._model = model
    return this
  }

  build(config = {}) {
    return new Form(Object.assign({
      model: this._model,
      inputs: this._inputs,
      name: this._name
    }, config))
  }
}
