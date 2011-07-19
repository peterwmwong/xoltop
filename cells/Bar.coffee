define ['Services','cell!signin/SignIn'], (S, SignIn)->
  $('<link  href="http://fonts.googleapis.com/css?family=Maven+Pro:700&v1" rel="stylesheet" type="text/css" >').appendTo 'head'
  
  render: (R)-> [
    R '#xoltop', 'XOLTOP'
    for item, i in @options.items
      R 'span.navItemContainer',
        R "a.navItem#{i is 0 and '.selected' or ''}",
          item.toUpperCase()
    R SignIn
  ]

  bind:
    'click .navItem': (ev)->
      @$('.navItem.selected').removeClass 'selected'
      (target = $(ev.target)).addClass 'selected'
      $(@el).trigger 'selectedItemChanged', item: $(target).attr 'data-item'
