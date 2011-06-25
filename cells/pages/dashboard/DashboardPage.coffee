define [
  'data/DashboardService'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./DashboardStory'
  'cell!./statusshelf/IterationChooser'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
], (DashboardService,LoadingIndicator,DashboardStory,IterationChooser,TestResultsGraph)->
  
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
    # When a Dashboard Story is selected
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')


    # When a new Interation is chosen
    'iterationNoChanged .IterationChooser': ({newIterationNo})->
      @$('.DashboardStory').remove()
      @$('.LoadingIndicator').trigger 'enable'

      # Fetch Stories for newly selected iteration
      DashboardService.getStorySummaries newIterationNo, ({stories})=>
        @$('.DashboardStory').remove()
        @$('.LoadingIndicator').trigger 'disable'
        for s in stories
          (new DashboardStory model: s).$el.appendTo @el
