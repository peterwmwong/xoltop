define ['Services','cell!signin/SignIn'], (S, SignIn)->
  $('<link  href="http://fonts.googleapis.com/css?family=Maven+Pro:700&v1" rel="stylesheet" type="text/css" >').appendTo 'head'
  
  render: (R)->
    #{R.cell 'SearchInput'}
    """
    <div id='xoltop'>XOLTOP</div>
    #{R @options.items, (item,i)=>"
      <span class='navItemContainer'>
        <a href='#'
           class='navItem #{R i == 0 and 'selected'}'
           data-item='#{item}'>#{item.toUpperCase()}</a>
      </span>
    "}
    #{R.cell SignIn} 
    """

  bind:
    'click .navItem': (ev)->
      @$('.navItem.selected').removeClass 'selected'
      (target = $(ev.target)).addClass 'selected'
      $(@el).trigger 'selectedItemChanged', item: $(target).attr 'data-item'
