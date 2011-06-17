define ['cell!./Tests/TestsSection','cell!./Tasks/TasksSection','cell!./Code/CodeSection'], (TestsSection, TasksSection,CodeSection)->

  getCodeCompleteColor = (pct)->
    if typeof pct != 'number' then 'gray'
    else if pct < 50 then 'red'
    else if 50 < pct < 100 then 'yellow'
    else 'green'

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

    """
    <div class='header'>
      <div>
        <div class='collapseStory'>
          <div>
            <div class='triangle'></div>
            <div class='rect'></div>
          </div>
        </div>
        <div class='storyID'>
          <div class='id badge #{statusColor}'>
            #{@model.storynum}
          </div>
        </div>
        <div class='countLabel code'>
          <div><a href='#'>CODE</a></div>
        </div>
        <div class='countBadges code'>
          <a class='badge #{getCodeCompleteColor @model.codeCompletePct} count'>
            #{R typeof @model.codeCompletePct == 'number' and "
              #{Math.floor @model.codeCompletePct}<span class='pct'>%</span>
            "}
          </a>
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
          <div>
            <a href='#'>#{@model.name}</a>
          </div>
        </div>
        <div class='chumps'>
          #{R @model.devs?.concat(@model.testers).join "<span class='divider'>&nbsp;</span>"}
        </div>
      </div>
    </div>
    <div class='details'></div>
    """

  bind: do->
    selectDetail = (detail)->
      (ev)->
        if not (alreadySelected = @$el.hasClass 'selected')
          @$el.trigger 'selected'
          @$el.toggleClass 'selected', true

        # Don't expand if already expanded
        if detail::name != @options.expandedSection
          @options.expandedSection = detail::name
          @$('.countLabel a.selected').toggleClass 'selected', false
          $(ev.target).toggleClass 'selected', true

          # hide current details
          @$('.detail.selected')
            .toggleClass('selected', false)
            .fadeOut()
         
          # Load new details for the first time
          if not ($detail = @$(".#{detail::name)}")[0]
            detailCell = new detail
              class:'detail selected'
              storynum: @model.storynum
            @$('.details').prepend detailCell.el
            detailCell.ready ->
              detailCell.$el.fadeIn()

          # Show already loaded details
          else
            $detail
              .prependTo($detail.parent())
              .toggleClass('selected', true)
              .fadeIn()

    'click .tests.countLabel a': selectDetail TestsSection
    'click .tasks.countLabel a': selectDetail TasksSection
    'click .code.countLabel a': selectDetail CodeSection
    'click .collapseStory': collapseStory = ->
      @$('.detail.selected').animate height:'hide', 'slow', =>
        @$el.toggleClass 'selected', false
        @$('.countLabel a.selected').toggleClass 'selected', false
      @options.expandedSection = undefined
    'deselected': collapseStory
