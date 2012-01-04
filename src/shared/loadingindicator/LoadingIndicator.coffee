define ['require'], (require)->

  init: ->
    @class = 'enableLoading' if @options.enable is true

  render: (_)-> [
    _ "<img class='loaderIcon' src='#{require.toUrl './ajax-loader.gif'}'/>"
    'Loading'
  ]
  on:
    enable: -> @$el.toggleClass 'enableLoading', true
    disable: -> @$el.toggleClass 'enableLoading', false
