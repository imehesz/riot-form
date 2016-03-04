<rf-form>
  <form name={ opts.model.name } class={ opts.className } onsubmit={ opts.onsubmit }>
    <rf-input
        each={ name, input in opts.model.inputs }
        model={ input }>
    <yield />
  </form>
</rf-form>
