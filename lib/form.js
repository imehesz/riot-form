import riot from 'riot'

export default class Form {
  constructor(model = {}, inputs = [], options = {}) {
    riot.observable(this)
    this._options = options
    this.model = model
    this.errors = {}
    this._setInputs(inputs)
  }

  get model() {
    return this._model
  }

  set model(model) {
    if (this.options.noClone) {
      this._model = model
    } else {
      this._model = Object.assign({}, model)
    }
  }

  _setInputs(inputs) {
    this._inputs = []
    for (const input in inputs) {
      input.off('change')
      input.value = this.model[input.name]
      input.on('change', this._makeChangeHandler(input))
      this._inputs.push(inputs)
    }
  }

  _makeChangeHandler(input) {
    return (value) => {
      this.model[input.name] = value
      this.errors[input.name] = input.errors
      this.trigger('change', input.name, value)
    }
  }

  getInput(name) {
    for (const input of this.inputs) {
      if (input.name === name) {
        return input
      }
    }
    throw new Error(`no input named ${name}`)
  }
}
