<rf-form>
  <form name={ opts.model.name } class={ opts.className } onsubmit={ opts.onsubmit }>
    <rf-input
        each={ name, input in opts.model.inputs }
        model={ input }
        form-name={ parent.opts.model.name }>
    <yield />
  </form>
</rf-form>
