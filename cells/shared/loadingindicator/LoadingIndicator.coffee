define
  render: -> "Loading"
  bind:
    'enable': -> @$el.toggleClass 'enableLoading', true
    'disable': -> @$el.toggleClass 'enableLoading', false
