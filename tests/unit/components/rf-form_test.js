import riot       from 'riot'
import {expect}   from 'chai'
import {Form}     from 'riot-form'
import {mountTag} from './helpers'

describe('rf-form', () => {
  const form = new Form.Builder('hello')
          .addInput({name: 'username', type: 'text'})
          .addInput({name: 'other', type: 'text'})
          .setModel({username: 'world'})
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

  it('should render the input', () => {
    const input = document.querySelector('input[name="hello_username"]')
    expect(input).not.to.be.null
    expect(input.placeholder).to.eq('Username')
    expect(input.value).to.eq('world')
  })

  it('should not set undefined initial values', () => {
    const input = document.querySelector('input[name="hello_other"]')
    expect(input).not.to.be.null
    expect(input.value).to.eq('')
  })
})
