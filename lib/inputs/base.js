import assert from 'assert'
import riot   from 'riot'
import config from '../config'

export default class BaseInput {
  constructor(config = {}) {
    riot.observable(this)
    assert(config.name, 'An input must have a name')
    this.config = config
    if (config.value) {
      this._setValue(config.value)
    }
  }

  get name() {
    return this.config.name
  }

  get tag() {
    return this.config.tag || this.constructor.defaultTag
  }

  set value(value) {
    this._setValue(value)
    this.trigger('change', value)
  }

  _setValue(value) {
    this._value = this.process(value)
    this.validate()
  }

  get value() {
    return this._value
  }

  get valid() {
    this.validate()
    return !this.errors
  }

  get type() {
    return this.config.type || this.constructor.type
  }

  // TODO: pre pack some validators to avoid having to pass a callback
  validate() {
    if (this.config.validate) {
      this.errors = this.config.validate(this._value)
    }
  }

  get formattedErrors() {
    if (this.config.formatErrors) {
      return this.config.formatErrors(this.errors)
    }
    return this.defaultFormatErrors(this.errors)
  }

  // TODO: pre pack some processors to avoid having to pass a callback
  get process() {
    return this.config.process || this.defaultProcess
  }

  get defaultProcess() {
    return config.processValue
  }

  get defaultFormatErrors() {
    return config.formatErrors
  }
}

BaseInput.extend = function (props) {
  class Input extends BaseInput {}
  Object.assign(Input.prototype, props)
  return Input
}
