import riot from 'riot'
import config from '../config'

riot.mixin('rf-input-helpers', {
  getID: function () {
    return config.makeID(this.opts.model.name, this.opts.formName)
  },
  getLabel: function () {
    return config.formatLabel(this.opts.model.name, this.opts.formName)
  },
  getPlaceholder: function () {
    return config.formatPlaceholder(this.opts.model.name, this.opts.formName)
  },
  formatErrors: function (errors) {
    return config.formatErrors(errors, this.opts.model.name, this.opts.formName)
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
  }
})
