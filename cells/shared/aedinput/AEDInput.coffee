define ->
  render: (o)-> [
  	#o '.label', @options.label or ''
    o '.addButton',
      o 'span.plus', '+'
      'Add Task'
    o 'input.newCodeTask', type:'text', placeholder: @options.placeholder or ''
  ]