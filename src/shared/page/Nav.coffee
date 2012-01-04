define
  init: ->
    @options.selectedTab ?= @options.tabs[0]

  render: (_)-> [
    _ 'ul',
      for tab,i in @options.tabs
        _ "li#{@options.selectedTab==tab and '.selected' or ''}",
          _ 'a', href:'#', id:tab,
            tab
          _ '.triangle'
  ]

  on:
    'click a': (ev)->
      @$('.selected').removeClass 'selected'
      $(target = ev.target).parent().addClass 'selected'
      $(@el).trigger 'changed', selectedTab: (@options.selectedTab = target.id)
