<rf-text-input>
  <input
      id={ getID() }
      name={ getName() }
      class={ opts.className }
      type={ opts.model.type }
      riot-value={ currentValue }
      onkeyup={ handleChange }
      onchange={ handleChange }
      autofocus={ opts.autofocus }
      placeholder={ getPlaceholder() }>

  <script>
    this.mixin('rf-input-helpers')
  </script>
</rf-text-input>
