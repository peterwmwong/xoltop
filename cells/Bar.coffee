define ['Services','cell!signin/SignIn'], (S, SignIn)->
  $('<link  href="http://fonts.googleapis.com/css?family=Maven+Pro:700&v1" rel="stylesheet" type="text/css" >').appendTo 'head'
  
  render: (_)-> [
    _ '#xoltop', 'XOLTOP'
    for item, i in @options.items
      _ 'span.navItemContainer',
        $("<a class='navItem #{i is 0 and 'selected' or ''}' data-item='#{item}'>#{item.toUpperCase()}</a>")[0]
    _ SignIn
  ]

  on:
    'click .navItem': (ev)->
      @$('.navItem.selected').removeClass 'selected'
      (target = $(ev.target)).addClass 'selected'
      $(@el).trigger 'selectedItemChanged', item: target.attr 'data-item'
