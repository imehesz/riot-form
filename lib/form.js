import riot from 'riot'
import assert from 'assert'

export default class Form {
  constructor(config = {}) {
    assert(config.name, 'A form must have a name')
    riot.observable(this)
    this._config = config
    this._inputs = config.inputs || []
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
    for (const input of this.inputs) {
      input.validate()
      this.errors[input.name] = input.errors
      if (input.errors) {
        valid = false
      }
    }
    return valid
  }

  _setInputValues() {
    for (const input of this.inputs) {
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

  getInput(name) {
    for (const input of this.inputs) {
      if (input.name === name) {
        return input
      }
    }
    throw new Error(`no input named ${name}`)
  }
}
