define ->
  defer = (f)-> setTimeout f,0
  renderChildren = (children)->
    container = @$ '#children'
    container.html ''
    if children?.length > 0
      for c in children
        child = new @cell
          class: c.type
          model: c
          dataProviders: @options.dataProviders
        container.append child.el
    else if @options.noChildrenCell?
      container.append new @options.noChildrenCell().el
    return

  init: ->
    if dp = @options.dataProviders[@model.type]
      @options.nodeCell = dp.nodeCell
      @options.getChildren = dp.getChildren
      @options.noChildrenCell = dp.noChildrenCell

    @options.rowClasses = ['Node']
    if t = @model.type
      @options.rowClasses.push t


  render: (_)->
    if @model.children instanceof Array
      defer => renderChildren.call this, @model.children
    if @options.getChildren
      @loadChildren ?= (reload)=>
        delete @loadChildren
        if not @model.children or reload
          @model.children = @options.getChildren.call @model,
            (children)=>
              if not @model.children or reload
                renderChildren.call this, (@model.children = children)
          if @model.children
            renderChildren.call this, @model.children

      if @model.expanded and not (@model.children instanceof Array)
        setTimeout(@loadChildren,0)
    [
      if @options.nodeCell
        _ @options.nodeCell,
          class: @options.rowClasses.join ' '
          model: @model
      else
        _ '.'+@options.rowClasses.join('.'), @model.id

      _ '#children'
    ]

  on:
    'click .Node': ({target})->
      if not @model.expanded
        @loadChildren?()
      @$('> #children').toggle(@model.expanded = not @model.expanded)
      @$('> .Node').toggleClass 'expanded', @model.expanded
      $(@el).toggleClass 'expanded', (@model.expanded)
      $(target).trigger 'expanded', @model.expanded
      false
