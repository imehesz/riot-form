import riot from 'riot'
import config from '../config'

riot.mixin('rf-input-helpers', {
  init: function () {
    this.currentValue = this.opts.model.value
  },
  getID: function () {
    return config.makeID(this.opts.model.name, this.getFormName())
  },
  getName: function () {
    return config.makeName(this.opts.model.name, this.getFormName())
  },
  getLabel: function () {
    return config.formatLabel(this.opts.model.name, this.getFormName())
  },
  getPlaceholder: function () {
    return config.formatPlaceholder(this.opts.model.name, this.getFormName())
  },
  formatErrors: function (errors) {
    return config.formatErrors(errors, this.opts.model.name, this.getFormName())
  },
  getLabelClassName: function () {
    return this.opts.labelClassName || config.labelClassName
  },
  getGroupClassName: function () {
    return this.opts.groupClassName || config.groupClassName
  },
  getErrorClassName: function () {
    return this.opts.errorClassName || config.errorClassName
  },
  getInputContainerClassName: function () {
    return this.opts.inputContainerClassName || config.inputContainerClassName
  },
  assignValue: function (value) {
    this.opts.model.value = value
  },
  getFormName: function () {
    return this.opts.formName || this.opts.model.formName
  },
  handleChange: function (e) {
    this.assignValue(e.target.value)
  }
})
