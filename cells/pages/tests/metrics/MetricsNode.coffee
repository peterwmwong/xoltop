define ['cell!./CountBar'], (CountBar)->

  DefaultNameCol = cell.extend
    'render <span>': (R)-> [
      @options.nameLabel
      R 'span.name', @model.data.name
    ]

  DefaultCountCol = cell.extend
    'render <span>': (R)->
      parent = @model.parent
      [
        R 'span.ats',
          R CountBar,
            model:
              count: ats = @model.ats or 0
              pct:
                if typeof (parentAts = parent?.ats or parent?.parent?.ats) == 'number'
                  ats/parentAts
                else 0
        R 'span.chumpTasks',
          R CountBar,
            model:
              count: cts = @model.chumpTasks or 0
              pct:
                if typeof (parentCts = parent?.chumpTasks or parent?.parent?.chumpTasks) == 'number'
                  cts/parentCts
                else 0
      ]

  countColCell : DefaultCountCol
  nameColCell : DefaultNameCol

  render: (R)->
    @$el.toggleClass 'expanded', !!@model.expanded
    [
      R '#expando', if @model.expanded then class: 'expanded'
      R @nameColCell, class: 'nameContainer', nameLabel: @nameLabel, model: @model
      R @countColCell, class: 'counts', model: @model.data
    ]

  bind:
    expanded: ->
      @$el.toggleClass 'expanded', @model.expanded
      @$('#expando').toggleClass 'expanded'
      false
