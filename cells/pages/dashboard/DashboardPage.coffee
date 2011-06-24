define [
  'data/DashboardService'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./DashboardStory'
  'cell!./statusshelf/IterationChooser'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
], (DashboardService,LoadingIndicator,DashboardStory,IterationChooser,TestResultsGraph)->
  
  CountLabel = cell.extend
    render: (R,A)->
      DashboardService.getTestStatus (data)=>
        A """
          <div class='count #{R not (count = data[@options.countProp]) and "passing"}'>#{count}</div>
          <div class='label'>#{@options.label}</div>
          """

  render: (R,A)->
    DashboardService.getStorySummaries null, ({iterationNo,stories})->
      A """
        <div class='stats'>
          #{R.cell IterationChooser, iterationNo:iterationNo}
          #{R.cell TestResultsGraph,
              type: 'ats'
              label: 'AT'
              urlPrefix: DashboardService.getXPToolBaseUrl 'xp.failingtestsbypackage.do?runID='}
          #{R.cell TestResultsGraph,
              type: 'units'
              label: 'UNIT'
              urlPrefix: DashboardService.getXPToolBaseUrl 'unittool.failingtestsbysuite.do?testRunID='}
        </div>
        #{R.cell LoadingIndicator}
        #{R stories, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')


    'iterationNoChanged .IterationChooser': ({newIterationNo})->
      @$('.DashboardStory').remove()
      @$('.LoadingIndicator').trigger 'enable'
      DashboardService.getStorySummaries newIterationNo, ({stories})=>
        @$('.DashboardStory').remove()
        @$('.LoadingIndicator').trigger 'disable'
        for s in stories
          (new DashboardStory model: s).$el.appendTo @el
