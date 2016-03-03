<rf-textarea-input>
  <textarea
      id={ getID() }
      name={ getName() }
      value={ opts.model.value }
      onkeyup={ handleChange }
      onchange={ handleChange }
      placeholder={ getPlaceholder() }>
    { opts.model.value }
  </textarea>

  <script>
    this.mixin('rf-input-helpers')

    this.handleChange = (e) => this.assignValue(e.target.value)
  </script>
</rf-textarea-input>
