import assert from 'assert'
import riot   from 'riot'
import config from '../config'

export default class BaseInput {
  constructor(config = {}) {
    riot.observable(this)
    assert(config.name, 'An input must have a name')
    this.config = config
  }

  get name() {
    return this.config.name
  }

  get tag() {
    return this.config.tag || this.constructor.defaultTag
  }

  set value(value) {
    this._value = this.process(value)
    this.validate()
    this.trigger('change', value)
  }

  get value() {
    return this._value
  }

  get valid() {
    this.validate()
    return !this.errors
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
