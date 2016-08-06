import BaseInput from './base'
import {padLeft} from '../util'

class TextInput extends BaseInput {
}
TextInput.defaultTag = 'rf-text-input'
TextInput.type       = 'text'

class EmailInput extends BaseInput {
}
EmailInput.defaultTag = 'rf-text-input'
EmailInput.type       = 'email'

class PasswordInput extends BaseInput {
}
PasswordInput.defaultTag = 'rf-text-input'
PasswordInput.type       = 'password'

class NumberInput extends BaseInput {
  preProcessValue(value) {
    return parseFloat(value)
  }
}
NumberInput.defaultTag = 'rf-text-input'
NumberInput.type       = 'number'

class URLInput extends BaseInput {
}
URLInput.defaultTag = 'rf-text-input'
URLInput.type       = 'url'

class TelInput extends BaseInput {
}
TelInput.defaultTag = 'rf-text-input'
TelInput.type       = 'tel'


class DateInput extends BaseInput {
  preProcessValue(value) {
    const timestamp = Date.parse(value)
    if (!timestamp) {
      return value
    }
    const date = new Date(timestamp)
    return [
      date.getFullYear(),
      padLeft((date.getMonth() + 1).toString(), 2, '0'),
      padLeft(date.getDate().toString(), 2, '0')
    ].join('-')
  }
}
DateInput.defaultTag = 'rf-text-input'
DateInput.type       = 'date'

class TextareaInput extends BaseInput {
}
TextareaInput.defaultTag = 'rf-textarea-input'
TextareaInput.type       = 'textarea'

class HiddenInput extends BaseInput {
}
HiddenInput.defaultTag = 'rf-text-input'
HiddenInput.type       = 'hidden'


export default {
  TextInput     : TextInput,
  EmailInput    : EmailInput,
  PasswordInput : PasswordInput,
  NumberInput   : NumberInput,
  URLInput      : URLInput,
  TelInput      : TelInput,
  DateInput     : DateInput,
  TextareaInput : TextareaInput,
  HiddenInput   : HiddenInput
}
