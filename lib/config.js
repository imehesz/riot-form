import {capitalize} from './util'
import assign       from 'object-assign'

const defaultConfig = {
  formatErrors: (errors) => {
    if (!errors) {
      return ''
    }
    if (Array.isArray(errors)) {
      return errors[0]
    }
    return errors.toString()
  },

  processValue: (value) => value,

  formatLabel: capitalize,
  formatPlaceholder: capitalize,

  makeID: (inputName, formName) => `${formName}_${inputName}`,
  makeName: (inputName, formName) => `${formName}_${inputName}`,

  labelClassName: '',
  groupClassName: '',
  errorClassName: '',
  inputContainerClassName: ''
}

const config = assign({}, defaultConfig)

export function restore() {
  assign(config, defaultConfig)
}

export {defaultConfig as defaultConfig}

export default config
