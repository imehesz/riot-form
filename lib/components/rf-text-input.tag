<rf-text-input>
  <input
      id={ getID() }
      name={ opts.model.name }
      type="text"
      value={ opts.model.value }
      onkeyup={ handleChange }
      onchange={ handleChange }
      placeholder={ getPlaceholder() }>

  <script>
    this.mixin('rf-input-helpers')

    this.handleChange = (e) => {
      this.opts.model.value = e.target.value
    }
  </script>
</rf-text-input>
