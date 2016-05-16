<rf-text-input>
  <input
      id={ getID() }
      name={ getName() }
      class={ opts.className }
      type={ opts.model.type }
      oninput={ handleChange }
      autofocus={ opts.autofocus }
      placeholder={ getPlaceholder() }>

  <script>
    this.mixin('rf-input-helpers')
    this.initializeValue()
  </script>
</rf-text-input>
