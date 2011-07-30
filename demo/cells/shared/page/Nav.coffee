define
  init: ->
    @options.selectedTab ?= @options.tabs[0]

  render: (R)-> [
    R 'ul',
      for tab,i in @options.tabs
        R "li#{@options.selectedTab==tab and '.selected' or ''}",
          R 'a', href:'#', id:tab,
            tab
          R '.triangle'
  ]

  bind:
    'click a': (ev)->
      @$('.selected').removeClass 'selected'
      $(target = ev.target).parent().addClass 'selected'
      $(@el).trigger 'changed', selectedTab: (@options.selectedTab = target.id)
