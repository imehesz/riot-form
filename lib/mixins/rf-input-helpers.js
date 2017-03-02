import riot from 'riot'
import config from '../config'

riot.mixin('rf-input-helpers', {
  init: function () {
    this.currentValue = this.opts.model.value
  },
  getID: function () {
    return this.getProperty('inputId') ||
      config.makeID(this.opts.model.name, this.getFormName())
  },
  getName: function () {
    return this.getProperty('inputName') ||
      config.makeName(this.opts.model.name, this.getFormName())
  },
  getLabel: function () {
    return this.getProperty('inputLabel') ||
      config.formatLabel(this.opts.model.name, this.getFormName())
  },
  getPlaceholder: function () {
    return this.getProperty('inputPlaceholder') ||
      config.formatPlaceholder(this.opts.model.name, this.getFormName())
  },
  formatErrors: function (errors) {
    return config.formatErrors(errors, this.opts.model.name, this.getFormName())
  },
  getLabelClassName: function () {
    return this.getProperty('labelClassName') || config.labelClassName
  },
  getGroupClassName: function () {
    return this.getProperty('groupClassName') || config.groupClassName
  },
  getErrorClassName: function () {
    return this.getProperty('errorClassName') || config.errorClassName
  },
  getInputContainerClassName: function () {
    return this.getProperty('inputContainerClassName') || config.inputContainerClassName
  },
  getProperty: function (propertyName) {
    return this.opts[propertyName] || this.opts.model.config[propertyName]
  },
  assignValue: function (value) {
    this.opts.model.setValue(value)
  },
  getFormName: function () {
    return this.opts.formName || this.opts.model.formName
  },
  valueIs: function (value) {
    return this.opts.model.value === value
  },
  handleChange: function (e) {
    this.assignValue(e.target.value)
  },
  initializeValue: function () {
    this.on('mount', () => {
      const input = this.root.querySelector(`[name="${this.getName()}"]`)
      if (input) {
        input.value = this.opts.model.value || ''
      }
      this.opts.model.on('change:update', () => {
        input.value = this.opts.model.value || ''
      })
    })
  }
})
