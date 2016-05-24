<rf-form>
  <form name={ opts.model.name } class={ opts.className } onsubmit={ opts.onsubmit }>
    <rf-text-input
        each={ name, input in opts.model.hiddenInputs }
        model={ input } />
    <rf-input
        each={ name, input in opts.model.visibleInputs }
        model={ input } />
    <yield />
  </form>
</rf-form>
