import assign       from 'object-assign'

import config       from './config'
import Form         from './form'
import FormBuilder  from './form-builder'
import inputs       from './inputs'
import inputFactory from './input-factory'
import BaseInput    from './inputs/base'

Form.Builder = FormBuilder

for (const input of Object.keys(inputs)) {
  inputFactory.register(inputs[input])
}

export function configure(conf) {
  assign(config, conf)
}

export {Form as Form}
export {inputFactory as inputFactory}
export {inputs as inputs}
export {BaseInput as BaseInput}
export {config as config}

import './components'
import './mixins'

export default {
  configure: configure,
  Form: Form,
  inputFactory: inputFactory,
  inputs: inputs,
  BaseInput: BaseInput,
  config: config
}
