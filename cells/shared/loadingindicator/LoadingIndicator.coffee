define
  render: -> [ "Loading" ]
  on:
    enable: -> @$el.toggleClass 'enableLoading', true
    disable: -> @$el.toggleClass 'enableLoading', false
