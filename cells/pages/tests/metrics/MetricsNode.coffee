define ['cell!./CountBar'], (CountBar)->

  DefaultNameCol = cell.extend
    tag: '<span>'
    render: (_)-> [
      @options.nameLabel
      _ 'span.name', @model.data.name
    ]

  DefaultCountCol = cell.extend
    tag: '<span>'
    render: (_)->
      parent = @model.parent
      [
        _ 'span.ats',
          _ CountBar,
            model:
              count: ats = @model.ats or 0
              pct:
                if typeof (parentAts = parent?.ats or parent?.parent?.ats) == 'number'
                  ats/parentAts
                else 0
        _ 'span.chumpTasks',
          _ CountBar,
            model:
              count: cts = @model.chumpTasks or 0
              pct:
                if typeof (parentCts = parent?.chumpTasks or parent?.parent?.chumpTasks) == 'number'
                  cts/parentCts
                else 0
      ]

  countColCell : DefaultCountCol
  nameColCell : DefaultNameCol

  render: (_)->
    @$el.toggleClass 'expanded', !!@model.expanded
    [
      _ "<div id='expando' class='#{@model.expanded and 'expanded' or ''}'>"
      _ @nameColCell, class: 'nameContainer', nameLabel: @nameLabel, model: @model
      _ @countColCell, class: 'counts', model: @model.data
    ]

  on:
    expanded: ->
      @$el.toggleClass 'expanded', @model.expanded
      @$('#expando').toggleClass 'expanded'
      false
