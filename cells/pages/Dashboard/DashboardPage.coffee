define ['data/DashboardService','cell!./DashboardStory'], (DashboardService,DashboardStory)->
  
  CountLabel = cell.extend
    render: (R,A)->
      DashboardService.getTestStatus (data)=>
        A """
          <div class='count #{R not (count = data[@options.countProp]) and "passing"}'>#{count}</div>
          <div class='label'>#{@options.label}</div>
          """

  render: (R,A)->
    DashboardService.getStorySummaries (sums)->
      A """
        <div class='stats'>
          <div class='iteration'>
            <div class='iterNum'>314</div>
            <div class='iterLabel'>ITERATION</div>
          </div>
          <div class='failingTests'>
            <div class='icon'><div>FAILING<div>TESTS</div></div></div>
            <div class='label'>&nbsp;</div>
          </div>
          #{R.cell CountLabel,
              class:'ATCount'
              label: 'AT'
              countProp: 'failingATs'}
          #{R.cell CountLabel,
              class:'UnitCount'
              label: 'UNIT'
              countProp: 'failingUnits'}
          #{R.cell CountLabel,
              class:'SmallCount'
              label: 'SMALL'
              countProp: 'failingSmalls'}
        </div>
        #{R sums, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')
   
