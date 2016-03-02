import assert       from 'assert'
import Form         from './form'
import BaseInput    from './inputs/base'
import inputFactory from './input-factory'

const noNameMessage = 'You must provide an input name'

export default class FormBuilder {
  constructor() {
    this._model = {}
    this._inputs = []
    this._name = null
  }

  addInput(input) {
    if (!(input instanceof BaseInput)) {
      input = inputFactory.create(input)
    }
    assert(input.name, noNameMessage)
    this._inputs.push(input)
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

  setName(name) {
    this._name = name
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
