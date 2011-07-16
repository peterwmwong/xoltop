define [
  'Services'
  'cell!./LabeledCounts'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./tests/TestsSection'
  'cell!./tasks/TasksSection'
  'cell!./code/CodeSection'
  'cell!shared/InitialsList'
], (S, LabeledCounts, LoadingIndicator,TestsSection,TasksSection,CodeSection,InitialsList)->

  statusToColor = ['red','yellow','green']

  render: (R)->
    """
    <div class='header'>
      <div class='collapseStory'>
        <div class='triangle'></div>
        <div class='rect'></div>
      </div>
      <div class='storyID #{statusToColor[@model.status]}'>
        #{@model.storynum}
      </div>
      #{R.cell LabeledCounts,
          class: 'code'
          label: "CODE"
          showIfZero: ['green']
          counts: do=>
            {completePct, notStarted, inProgress, completed} = @model.codeTasks
            if notStarted
              red: completePct
            else if inProgress
              yellow: completePct
            else
              green: completePct
      }
      #{R.cell LabeledCounts,
          class: 'tests'
          label: "TESTS"
          showIfZero: ['green']
          counts: do=>
            {failing,needsAttn,unwritten,total} = @model.ats
            if failing + needsAttn + unwritten
              red: failing
              needsAttn: needsAttn
              yellow: unwritten
            else
              green: total
      }
      #{R.cell LabeledCounts,
          class: 'tasks'
          label: "TASKS"
          showIfZero: ['green']
          counts: do=>
            {needsAttn,retest,completed} = @model.tasks
            if needsAttn + retest
              red: needsAttn
              yellow: retest
            else
              green: completed
      }
      <a class='name' target='_blank' href='http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=#{@model.storynum}'>#{@model.name}</a>
      <div class='chumps'>
        #{R.cell InitialsList, initials:[@model.devs..., @model.testers...]}
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

    'click .header > .tests': selectSection TestsSection
    'click .header > .tasks': selectSection TasksSection
    'click .header > .code': selectSection CodeSection
    'click .collapseStory': collapseStory = ->
      @$('.detail.selected').animate height:'hide', 'slow', =>
        @$el.toggleClass 'selected', false
        @$('.countCol > .selected').toggleClass 'selected', false
      @options.expandedSection = undefined
    'deselected': collapseStory
