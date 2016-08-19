import riot       from 'riot'
import {expect}   from 'chai'
import {Form}     from 'riot-form'
import {mountTag} from './helpers'

describe('rf-form', () => {
  const form = new Form.Builder('hello')
          .addInput({name: 'username', type: 'text'})
          .addInput({name: 'other', type: 'text'})
          .addInput({
            name: 'customized',
            type: 'text',
            inputLabel: 'Customized label',
            inputPlaceholder: 'Customized placeholder'
          })
          .addInput({name: 'hideme', type: 'hidden'})
          .setModel({username: 'world', hideme: 'i-am-hidden'})
          .build()

  before(() => {
    mountTag('rf-form', {
      model: form,
      className: 'custom-class'
    })
  })

  it('should display form', () => {
    const form = document.querySelector('form[name="hello"]')
    expect(form).not.to.be.null
    expect(form.className).to.eq('custom-class')
  })

  it('should render the label', () => {
    const label = document.querySelector('label[for="hello_username"]')
    expect(label).not.to.be.null
    expect(label.innerText || label.textContent).to.eq('Username')
  })

  it('should allow to customize labels', () => {
    const label = document.querySelector('label[for="hello_customized"]')
    expect(label).not.to.be.null
    expect(label.innerText || label.textContent).to.eq('Customized label')
  })

  it('should render the input', () => {
    const input = document.querySelector('input[name="hello_username"]')
    expect(input).not.to.be.null
    expect(input.placeholder).to.eq('Username')
    expect(input.value).to.eq('world')
  })

  it('should allow to customize placeholders', () => {
    const input = document.querySelector('input[name="hello_customized"]')
    expect(input).not.to.be.null
    expect(input.placeholder).to.eq('Customized placeholder')
  })

  it('should render hidden inputs without label', () => {
    const input = document.querySelector('input[name="hello_hideme"]')
    expect(input).not.to.be.null
    expect(input.value).to.eq('i-am-hidden')
    const label = document.querySelector('label[for="hello_hideme"]')
    expect(label).to.be.null
  })

  it('should not set undefined initial values', () => {
    const input = document.querySelector('input[name="hello_other"]')
    expect(input).not.to.be.null
    expect(input.value).to.eq('')
  })
})
