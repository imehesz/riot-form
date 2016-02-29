import assert from 'assert'

class InputFactory {
  constructor() {
    this.inputs = {}
  }

  create(options) {
    assert(options.type, 'An input needs a type')
    const Input = this.inputs[options.type]
    assert(Input, `No input available for type ${options.type}`)
    return new Input(options)
  }

  register(type, klass) {
    if (this.inputs[type]) {
      throw new Error(`An input already exists with type ${type}`)
    }
    this.inputs[type] = klass
  }
}

export default new InputFactory()
