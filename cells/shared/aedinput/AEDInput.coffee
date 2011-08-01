define ->
  render: (o)-> [
    if @options.disableDelete isnt true
      o '.deleteButton',
        o 'span.trash',
          o 'a'
        o 'span.label', 'Are you sure?'
    o 'input', type:'text', placeholder: @options.placeholder or '', value: @options.value or ''
  ]

  bind:
    'click .deleteButton': ->
      $deleteButton = @$ '.deleteButton'
      confirmed = $deleteButton.hasClass 'confirm'
      @$('.deleteButton').toggleClass 'confirm'

      if confirmed
        @$el.trigger 'delete'
    
    'mouseleave .deleteButton': ->
      @$('.deleteButton').toggleClass 'confirm', false

    'keyup input': ({which,target})->
      blankOutInput = ->
        target.attr 'value', ''
        target.blur()
        
      switch which
        when 27 # <ESC>
          blankOutInput()

        when 13 # <ENTER>
          target = $(target)
          codeTaskText = target.attr 'value'
          blankOutInput()