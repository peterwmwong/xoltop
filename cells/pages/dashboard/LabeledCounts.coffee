define
  init: ->
    @options.showIfZero ?= []

  render: (R)->
    """
    <div class='triangle'></div>
    <a href='#' class='label'>#{@options.label}</a>
    <div class='counts'>
    #{R (for type,count of @options.counts when count > 0 or type in @options.showIfZero
        "<div class='#{type} count'>#{count}</div>"
    )}
    </div>
    """