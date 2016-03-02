import assert    from 'assert'
import BaseInput from './inputs/base'

class InputFactory {
  constructor() {
    this._inputs = {}
  }

  get inputs() {
    return this._inputs
  }

  create(config = {}) {
    assert(config.type, 'An input needs a type')
    const Input = this.inputs[config.type]
    assert(Input, `No input available for type ${config.type}`)
    return new Input(config)
  }

  register(input = {}) {
    assert(input.type, `no type found for input ${input}`)
    assert(input.defaultTag, 'Input should have a defaultTag property')
    assert(input.prototype instanceof BaseInput, 'Input should be a subclass of BaseInput')
    this.inputs[input.type] = input
  }

  unregisterAll() {
    this._inputs = {}
  }
}

export default new InputFactory()
