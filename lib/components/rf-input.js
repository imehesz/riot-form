import riot from 'riot'

import html from './rf-input.html'

riot.tag('rf-input', html, function (opts) {
  this.mixin('rf-input-helpers')
  let tag = null

  const makeData = () => {
    return { model: opts.model, formName: opts.formName }
  }

  this.on('mount', () => {
    const input = this.root.querySelector('[rf-input-elem]')
    if (!input) {
      throw new Error('element with attribute rf-input-elem not found in rf-input html')
    }
    tag = riot.mount(input, opts.model.tag, makeData())[0]
  })

  this.on('update', () => {
    if (tag) {
      tag.update(makeData())
    }
  })
})
