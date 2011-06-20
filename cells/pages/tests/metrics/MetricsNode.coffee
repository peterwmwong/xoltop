define ['cell!./CountBar'], (CountBar)->

  DefaultNameCol = cell.extend
    'render <span>': ->
      """
      #{@options.nameLabel or ''}
      <span class='name'>#{@model.data.name or ''}</span>
      """

  DefaultCountCol = cell.extend
    'render <span>': (R)->
      parent = @model.parent
      """
      <span class='ats'>#{
        R.cell CountBar, model:
          count: ats = @model.ats or 0
          pct:
            if typeof (parentAts = parent?.ats or parent?.parent?.ats) == 'number'
              ats/parentAts
            else 0
      }</span>
      <span class='chumpTasks'>#{
        R.cell CountBar, model:
          count: cts = @model.chumpTasks or 0
          pct:
            if typeof (parentCts = parent?.chumpTasks or parent?.parent?.chumpTasks) == 'number'
              cts/parentCts
            else 0
      }</span>
      """

  countColCell : DefaultCountCol
  nameColCell : DefaultNameCol

  render: (R)->
    @$el.toggleClass 'expanded', !!@model.expanded
    """
    <div id='expando' #{R @model.expanded and "class='expanded'"}></div>
    #{R.cell @nameColCell, class: 'nameContainer', nameLabel: @nameLabel, model: @model}
    #{R.cell @countColCell, class: 'counts', model: @model.data}
    """
  
  bind:
    expanded: ->
      @$el.toggleClass 'expanded', @model.expanded
      @$('#expando').toggleClass 'expanded'
      false
