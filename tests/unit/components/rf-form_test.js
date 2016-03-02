import riot       from 'riot'
import {expect}   from 'chai'
import {Form}     from 'riot-form'
import {mountTag} from './helpers'

describe('rf-form', () => {
  let tag

  const form = new Form.Builder()
          .setName('hello')
          .addInput({name: 'username', type: 'text'})
          .setModel({username: 'world'})
          .build()

  before(() => {
    tag = mountTag('rf-form', {
      model: form,
      className: 'custom-class'
    })
  })

  it('should display form', () => {
    const form = document.querySelector('form[name="hello"]')
    expect(form).not.to.be.null
    expect(form.className).to.eq('custom-class')
  })

  it('should render the inputs', () => {
    const label = document.querySelector('label[for="hello_username"]')
    expect(label).not.to.be.null
    expect(label.innerText).to.eq('Username')
  })

  it('should render the inputs', () => {
    const input = document.querySelector('input[name="username"]')
    expect(input).not.to.be.null
    expect(input.placeholder).to.eq('Username')
    expect(input.value).to.eq('world')
  })
})
