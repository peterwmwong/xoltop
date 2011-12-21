define ->
  render: (_)-> [
    _ '.inputGroup',
      _ 'input', type:'text', placeholder: @options.placeholder or '', value: @options.value or ''
      _ '.saveButtonMask', class:'save',
        _ '.saveButton',
          _ 'span.savingIcon'
          _ 'span.label-saving', 'Saving'
          _ 'span.label-save', 'Save'
    if @options.disableDelete isnt true
      _ '.deleteButton',
        _ 'a.trash',
          _ 'a'
        _ 'span.label', 'Are you sure?'
  ]

  on:
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

        else
          