<rf-textarea-input>
  <textarea
      id={ getID() }
      name={ getName() }
      onkeyup={ handleChange }
      onchange={ handleChange }
      placeholder={ getPlaceholder() }></textarea>

  <script>
    this.mixin('rf-input-helpers')
    this.initializeValue()
  </script>
</rf-textarea-input>
