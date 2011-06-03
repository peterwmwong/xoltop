define
  init: ->
    @options.items ?= []
    @options.selectedItem ?= @options.items[0]

  render: (R)->
    """
    <div id='xoltop'>
      <div id='label'>XOLTOP</div>
    </div>
    #{R @options.items, (item,i)=>"
      <div class='navItemContainer'>
        <a href='#'
           class='navItem #{R @options.selectedItem == item and 'selected'}'
           data-item='#{item}'>#{item.toUpperCase()}</a>
      </div>
    "}
    #{R.cell 'SearchInput'}
    """

  bind:
    'click .navItem': (ev)->
      @$('.navItem.selected').removeClass 'selected'
      (target = $(ev.target)).addClass 'selected'
      $(@el).trigger 'selectedItemChanged', item: $(target).attr 'data-item'
