define ['cell!./StoryDetails','cell!./TestDetails','cell!./TaskDetails'], (StoryDetails,TestDetails,TaskDetails)->
  Count = cell.extend
    class: 'Count'
    'render <div>': (R)->
      """
      <a class='label' href='#'>#{@options.label}</a>
      #{R ['yellow','red'], (color)=>
        @options[color] != 0 and "<a class='badge #{color} count' href='#'>#{@options[color]}</a>"
      }
      """

    bind: do->
      trigger = ->
        $(@el).trigger 'selected'
        false
      'click :parent > .label': trigger
      'click :parent > .count': trigger


  render: (R)->
    ats = @model.ats
    tasks = @model.tasks
    statusColor =
      if ats.failing + tasks.needsAttn
        'red'
      else if ats.unwritten + tasks.retest
        'yellow'
      else if ats.total + tasks.total
        'green'
      else
        'gray'
    """
    <div id='header'>
      <div>
        <div id='storyID'>
          <div id='id' class='badge #{statusColor}'>
            #{@model.storynum}
          </div>
        </div>
        #{R.cell Count,
            id: 'tests'
            label: 'TESTS'
            red: ats.failing
            yellow: ats.unwritten
            gray: ats.total} 
        #{R.cell Count,
            id: 'tasks'
            label: 'TASKS'
            red: tasks.needsAttn
            yellow: tasks.retest
            gray: tasks.total} 
        <div id='name'>
          <a href="#">#{@model.name}</a>
        </div>
      </div>
    </div>
    <div id='details'>
      #{R.cell StoryDetails, class: 'detail', model: storynum: @model.storynum}
      #{R.cell TestDetails, class: 'detail', model: storynum: @model.storynum}
      #{R.cell TaskDetails, class: 'detail', model: storynum: @model.storynum}
    </div>
    """

  bind: do->
    selectDetail = (detailName, sel)->
      (target)->
        console.log 'hello'

        # reset selected
        @$('.selected').toggleClass 'selected', false

        if detailName != @options.curDetail
          @options.curDetail = detailName
          @$('#details > .detail').toggle false
          @$(detailName)
            .toggle(true)
            .trigger 'load'
          @model.expanded = true
        
        else
          @model.expanded = not @model.expanded

        @$(sel).toggleClass 'selected', @model.expanded
        $(@el).toggleClass 'selected', @model.expanded
        @$('#details').toggleClass 'expanded', @model.expanded
        false

    'click #header #storyID': selectDetail '.StoryDetails', '#header #storyID'
    'selected #header #tests': selectDetail '.TestDetails', '#header #tests'
    'selected #header #tasks': selectDetail '.TaskDetails', '#bar #tasks'
