define ->
  render: (o)-> [
  	o '.label', @options.label or ''
    o 'input.newCodeTask', type:'text', placeholder: @options.placeholder or ''
    o '.addButton',
      o 'span.plus', '+'
      'Add'
  ]