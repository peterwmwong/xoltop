define [
  'data/DashboardService'
  'cell!./DashboardStory'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
], (DashboardService,DashboardStory,TestResultsGraph)->
  
  CountLabel = cell.extend
    render: (R,A)->
      DashboardService.getTestStatus (data)=>
        A """
          <div class='count #{R not (count = data[@options.countProp]) and "passing"}'>#{count}</div>
          <div class='label'>#{@options.label}</div>
          """

  render: (R,A)->
    DashboardService.getStorySummaries (sums)->
      #{R.cell TestResultsGraph, type: 'units', label: 'SMALL'}
      A """
        <div class='stats'>
          <div class='iteration'>
            <div class='iterNum'>314</div>
            <div class='iterLabel'>ITERATION</div>
          </div>
          #{R.cell TestResultsGraph, type: 'ats', label: 'AT'}
          #{R.cell TestResultsGraph, type: 'units', label: 'UNIT'}
        </div>
        #{R sums, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')
   
