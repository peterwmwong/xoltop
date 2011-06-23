define [
  'data/DashboardService'
  'cell!./DashboardStory'
  'cell!./statusshelf/IterationChooser'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
], (DashboardService,DashboardStory,IterationChooser,TestResultsGraph)->
  
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
          #{R.cell TestResultsGraph, type: 'ats', label: 'AT'}
          #{R.cell TestResultsGraph, type: 'units', label: 'UNIT'}
        </div>
        <div class='loading'>Loading...</div>
        #{R stories, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')


    'iterationNoChanged .IterationChooser': ({newIterationNo})->
      @$('.DashboardStory').remove()
      @$('.loading').toggleClass 'enableLoading', true
      DashboardService.getStorySummaries newIterationNo, ({stories})=>
        @$('.loading').toggleClass 'enableLoading', false
        for s in stories
          (new DashboardStory model: s).$el.appendTo @el

   
