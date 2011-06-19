define ['cell!./Tests/TestsSection','cell!./Tasks/TasksSection','cell!./Code/CodeSection'], (TestsSection, TasksSection,CodeSection)->

  getCodeCompleteColor = (pct)->
    if typeof pct != 'number' then 'gray'
    else if pct < 50 then 'red'
    else if 50 < pct < 100 then 'yellow'
    else 'green'

  render: (R)->
    {ats,tasks,codeCompletePct} = @model

    # Determine status color of the story, based on the state of the story's ATs and tasks
    statusColor =
      if codeCompletePct < 100
        'red'
      else if ats.failing + tasks.needsAttn
        'red'
      else if ats.unwritten + tasks.retest
        'yellow'
      else
        'green'

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
        <div class='countCol code'>
          <div>
            <a href='#'>CODE</a>
            <span class='countBadge'>
            #{R typeof codeCompletePct == 'number' and "
              <span class='#{getCodeCompleteColor codeCompletePct}'>
                #{Math.floor codeCompletePct}<span class='pct'>%</span>
              </span>
            "}
            </span>
          </div>
        </div>
        #{R [['tests',[ats.failing, ats.unwritten, ats.total]],['tasks',[tasks.needsAttn, tasks.retest, tasks.total]]], ([label,[red,yellow,total]])->"
          <div class='countCol #{label}'>
            <div>
              <a href='#'>#{label.toUpperCase()}</a>
              <span class='countBadge'>
              #{
              if red or yellow then R [['red',red],['yellow',yellow]], ([color,count])=>
                R count != 0 and "<span class='#{color}'>#{count}</span>"
              else
                R "<span class='green'>#{total}</span>"
              }
              </span>
            </div>
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
          @$('.countCol > .selected').toggleClass 'selected', false
          $(ev.target).parent().toggleClass 'selected', true

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

    'click .tests.countCol a': selectDetail TestsSection
    'click .tasks.countCol a': selectDetail TasksSection
    'click .code.countCol a': selectDetail CodeSection
    'click .collapseStory': collapseStory = ->
      @$('.detail.selected').animate height:'hide', 'slow', =>
        @$el.toggleClass 'selected', false
        @$('.countCol > .selected').toggleClass 'selected', false
      @options.expandedSection = undefined
    'deselected': collapseStory
