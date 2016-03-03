<rf-text-input>
  <input
      id={ getID() }
      name={ getName() }
      class={ opts.className }
      type={ opts.model.type }
      value={ opts.model.value }
      onkeyup={ handleChange }
      onchange={ handleChange }
      autofocus={ opts.autofocus }
      placeholder={ getPlaceholder() }>

  <script>
    this.mixin('rf-input-helpers')

    this.handleChange = (e) => this.assignValue(e.target.value)
  </script>
</rf-text-input>
