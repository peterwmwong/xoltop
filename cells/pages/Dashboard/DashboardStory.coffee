define ['cell!./Tests/TestsSection','cell!./Tasks/TasksSection'], (TestsSection, TasksSection)->
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
    <div class='header'>
      <div>
        <div class='storyID'>
          <div class='id badge #{statusColor}'>
            #{@model.storynum}
          </div>
        </div>
        #{R [['tests',[ats.failing, ats.unwritten]],['tasks',[tasks.needsAttn, tasks.retest]]], ([label,[red,yellow]])->"
          <div class='#{label} countLabel'>
            <div><a href='#'>#{label.toUpperCase()}</a></div>
          </div>
          <div class='countBadges'>
          #{R [['red',red],['yellow',yellow]], ([color,count])=>
            count != 0 and "<a class='badge #{color} count'>#{count}</a>"
          }         
          </div>
        "}
        <div class='name'>
          <div><a href='#'>#{@model.name}</a></div>
        </div>
      </div>
    </div>
    <div class='details' style='display: #{initExpandedSection and 'block' or 'none'}'>
      #{R initExpandedSection? and R.cell initExpandedSection, class:'detail', storynum: @model.storynum}
    </div>
    """

  bind: do->
    selectDetail = (detail)->
      (ev)->
        # Don't expand if already expanded
        if detail::name != @options.expandedSection
          @options.expandedSection = detail::name
          @$('.countLabel a.selected').toggleClass 'selected', false
          $(ev.target).toggleClass 'selected', true
          @$('.details').toggle true

          # hide all details
          @$('.detail').toggle false
         
          # Load details for the first time
          if not ($detail = @$(".#{detail::name)}")[0]
            detailCell = new detail
              class:'detail'
              storynum: @model.storynum
            @$('.details').append detailCell.el
            detailCell.ready ->
              detailCell.$el.animate height:'toggle', 'slow'

          else
            # Show already loaded details
            $detail.animate height:'toggle', 'slow'

    'click .tests.countLabel a': selectDetail TestsSection, '.tests.countLabel'
    'click .tasks.countLabel a': selectDetail TasksSection, '.tasks.countLabel'
