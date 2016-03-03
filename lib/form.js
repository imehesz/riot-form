import riot from 'riot'
import assert from 'assert'

export default class Form {
  constructor(config = {}) {
    assert(config.name, 'A form must have a name')
    riot.observable(this)
    this._config = config
    this._inputs = config.inputs || {}
    this.model = config.model || {}
    this._errors = {}
  }

  get name() {
    return this._config.name
  }

  get config() {
    return this._config
  }

  get model() {
    return this._model
  }

  get inputs() {
    return this._inputs
  }

  get errors() {
    return this._errors
  }

  set model(model) {
    if (this.config.noClone) {
      this._model = model
    } else {
      this._model = Object.assign({}, model)
    }
    this._setInputValues()
  }

  get valid() {
    let valid = true
    for (const name of Object.keys(this.inputs)) {
      const input = this.inputs[name]
      input.validate()
      this.errors[name] = input.errors
      if (input.errors) {
        valid = false
      }
    }
    return valid
  }

  get inputsCount() {
    return Object.keys(this.inputs).length
  }

  _setInputValues() {
    for (const name of Object.keys(this.inputs)) {
      const input = this.inputs[name]
      input.off('change')
      input.value = this.model[input.name]
      input.on('change', this._makeChangeHandler(input))
    }
  }

  _makeChangeHandler(input) {
    return (value) => {
      this.model[input.name] = value
      this.errors[input.name] = input.errors
      this.trigger('change', input.name, value)
    }
  }

  eachInput(f) {
    for (const name of Object.keys(this.inputs)) {
      f(this.inputs[name], name)
    }
  }
}
