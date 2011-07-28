define ->
  render: (o)-> [
    o '.addButton',
      o 'span.plus', '+'
      'Add'
    o 'input.newCodeTask', type:'text', placeholder:'... a new code task'
  ]