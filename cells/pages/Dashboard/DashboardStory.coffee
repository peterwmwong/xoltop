define ['cell!./Tests/TestsSection','cell!./Tasks/TasksSection'], (TestsSection, TasksSection)->
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
    {ats,tasks} = @model
    # Determine status color of the story, based on the state of the story's ATs and tasks
    statusColor =
      if ats.failing + tasks.needsAttn
        'red'
      else if ats.unwritten + tasks.retest
        'yellow'
      else if ats.total + tasks.total
        'green'
      else
        'gray'
    
    # Initially expanded section
    initExpandedSection =
      switch @options.expandedSection
        when 'TestsSection' then TestsSection
        when 'TasksSection' then TasksSection

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
    <div class='details' style='display: #{initExpandedSection and 'block' or 'none'}'>
      #{R initExpandedSection? and R.cell initExpandedSection, class:'detail', storynum: @model.storynum}
    </div>
    """

  bind: do->
    selectDetail = (detail)->
      (target)->
        # Don't expand if already expanded
        if detail::name != @options.expandedSection
          @options.expandedSection = detail::name
          @$('.details').toggle true

          # hide all details
          @$('.detail').toggle false
         
          # Load details for the first time
          if not ($detail = @$(".#{detail::name)}")[0]
            $detail = $(new(detail)(class:'detail', storynum: @model.storynum).el)
            @$('.details').append($detail)
            
          # Show already loaded details
          else
            $detail.toggle()

    'selected #header #tests': selectDetail TestsSection
    'selected #header #tasks': selectDetail TasksSection
