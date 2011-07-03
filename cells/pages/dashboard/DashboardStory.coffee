define [
  'Services'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./tests/TestsSection'
  'cell!./tasks/TasksSection'
  'cell!./code/CodeSection'
], (S, LoadingIndicator,TestsSection,TasksSection,CodeSection)->

  getCodeCompleteColor = (pct,incomplete)->
    if typeof pct != 'number' then 'gray'
    else if pct < 50 then 'red'
    else if 50 < pct < 100 then 'yellow'
    else if incomplete > 0
      'yellow'
    else
      'green'

  render: (R)->
    {ats,tasks,codeCompletePct,codeTasksIncomplete} = @model
    
    # Determine status color of the story, based on the state of the story's ATs and tasks
    statusColor =
      if codeCompletePct < 100 or ats.total == 0
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
          <div class='triangle'></div>
          <div class='rect'></div>
        </div>
        <div class='storyID'>
          <div class='id badge #{statusColor}'>
            <span>#{@model.storynum}</span>
          </div>
        </div>
        <div class='countCol code'>
          <div>
            <a href='#'>CODE</a>
            <span class='countBadge'>
            #{R typeof codeCompletePct == 'number' and "
              <span class='#{getCodeCompleteColor codeCompletePct, codeTasksIncomplete}'>
                #{Math.floor codeCompletePct}<span class='pct'>%</span>
              </span>
            "}
            </span>
          </div>
        </div>
        #{R [['tests',[ats.failing,ats.unwritten, ats.total,ats.needsAttn]],['tasks',[tasks.needsAttn, tasks.retest, tasks.total]]], ([label,[red,yellow,total,needsAttn]])->"
          <div class='countCol #{label}'>
            <div>
              <a href='#'>#{label.toUpperCase()}</a>
              <span class='countBadge'>
              #{
              if red or yellow or needsAttn
                R [['needsAttn',needsAttn],['red',red],['yellow',yellow]], ([color,count])=>
                  R count? and count > 0 and "<span class='#{color}'>#{count}</span>"
              else
                R "<span class='#{if label == 'tests' and total == 0 then 'red' else 'green'}'>#{total}</span>"
              }
              </span>
            </div>
          </div>
        "}
        <div class='name'>
          <div>
            <a target='_blank' href='http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=#{@model.storynum}'>#{@model.name}</a>
          </div>
        </div>
        <div class='chumps'>
          #{R @model.devs?.concat(@model.testers).join "<span class='divider'>&nbsp;</span>"}
        </div>
      </div>
    </div>
    <div class='details'>
      #{R.cell LoadingIndicator}
      <div class='contents'></div>
    </div>
    """

  bind: do->
    selectSection = (detail)->
      (ev)->
        if not (alreadySelected = @$el.hasClass 'selected')
          @$el.trigger 'selected'
          @$el.toggleClass 'selected', true


        # Collapse if already expanded
        if detail::name == @options.expandedSection
          collapseStory.call this

        # Expand another section
        else
          @options.expandedSection = detail::name
          @$('.countCol > .selected').toggleClass 'selected', false
          $(ev.target).closest('div').toggleClass 'selected', true

          # hide current details
          @$('.detail.selected')
            .toggleClass('selected', false)
            .fadeOut()
         
          # Load new details for the first time
          if not ($detail = @$(".#{detail::name)}")[0]
            detailCell = new detail
              class:'detail selected'
              storynum: @model.storynum
            @$('.details > .contents').prepend detailCell.el
            @$('.LoadingIndicator').trigger 'enable'
            detailCell.ready ->
              @$('.LoadingIndicator').trigger 'disable'
              detailCell.$el.fadeIn()

          # Show already loaded details
          else
            $detail
              .prependTo($detail.parent())
              .toggleClass('selected', true)
              .fadeIn()

    'click .tests.countCol': selectSection TestsSection
    'click .tasks.countCol': selectSection TasksSection
    'click .code.countCol': selectSection CodeSection
    'click .collapseStory': collapseStory = ->
      @$('.detail.selected').animate height:'hide', 'slow', =>
        @$el.toggleClass 'selected', false
        @$('.countCol > .selected').toggleClass 'selected', false
      @options.expandedSection = undefined
    'deselected': collapseStory
