<rf-text-input>
  <input
      id={ getID() }
      name={ getName() }
      class={ opts.className }
      type={ opts.model.type }
      onkeyup={ handleChange }
      onchange={ handleChange }
      autofocus={ opts.autofocus }
      placeholder={ getPlaceholder() }>

  <script>
    this.mixin('rf-input-helpers')
    this.initializeValue()
  </script>
</rf-text-input>
