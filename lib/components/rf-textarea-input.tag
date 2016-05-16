<rf-textarea-input>
  <textarea
      id={ getID() }
      name={ getName() }
      oninput={ handleChange }
      placeholder={ getPlaceholder() }></textarea>

  <script>
    this.mixin('rf-input-helpers')
    this.initializeValue()
  </script>
</rf-textarea-input>
