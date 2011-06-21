define
  init: ->
    @options.selectedTab ?= @options.tabs[0]

  render: (R)->
    #{R.cell 'SearchInput'}
    """
    <ul>
      #{R @options.tabs, (tab,i)=>"
        <li #{R @options.selectedTab==tab and "class='selected'"}>
          <a href='#' id='#{tab}'>#{tab}</a><div class='triangle'></div>
        </li>
      "}
    </ul>
    """

  bind:
    'click a': (ev)->
      @$('.selected').removeClass 'selected'
      $(target = ev.target).parent().addClass 'selected'
      $(@el).trigger 'changed', selectedTab: (@options.selectedTab = target.id)
