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

  register(input) {
    const type = input.type
    assert(type, `no type found for input ${input}`)
    if (this.inputs[type]) {
      throw new Error(`An input already exists with type ${type}`)
    }
    this.inputs[type] = input
  }
}

export default new InputFactory()
