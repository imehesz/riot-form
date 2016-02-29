import Form         from './form'
import FormBuilder  from './form-builder'
import inputs       from './inputs'
import inputFactory from './input-factory'
import BaseInput    from './inputs/base'

Form.Builder = FormBuilder

for (const input of Object.keys(inputs)) {
  inputFactory.register(inputs[input])
}

export {Form as Form}
export {inputFactory as inputFactory}
export {inputs as inputs}
export {BaseInput as BaseInput}
