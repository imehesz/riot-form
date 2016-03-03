import {capitalize} from './util'

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
  makeName: (inputName, formName) => `${formName}_${inputName}`
}

const config = Object.assign({}, defaultConfig)

export function restore() {
  Object.assign(config, defaultConfig)
}

export {defaultConfig as defaultConfig}

export default config
