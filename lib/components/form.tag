<rf-form>
  <form name={ opts.name } class={ opts.class } onsubmit={ opts.onsubmit }>
    <rf-input each={ opts.form.inputs } input={ this }></rf-input>
    <yield />
  </form>
</rf-form>
