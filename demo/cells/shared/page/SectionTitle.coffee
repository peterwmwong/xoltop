define
  render: (R)-> [
    R 'span#title', @options.title
    R 'span#description', @options.description
  ]
