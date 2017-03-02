<rf-form>
  <form name={ opts.model.name } class={ opts.className } onsubmit={ opts.onsubmit }>
    <rf-text-input
        each={ input, name in opts.model.hiddenInputs }
        model={ input } />
    <rf-input
        each={ input, name in opts.model.visibleInputs }
        model={ input } />
    <yield />
  </form>
</rf-form>
