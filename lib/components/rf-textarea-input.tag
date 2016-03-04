<rf-textarea-input>
  <textarea
      id={ getID() }
      name={ getName() }
      onkeyup={ handleChange }
      onchange={ handleChange }
      placeholder={ getPlaceholder() }>{ currentValue }</textarea>

  <script>
    this.mixin('rf-input-helpers')
  </script>
</rf-textarea-input>
