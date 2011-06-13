define ['data/DashboardService','cell!./DashboardStory'], (DashboardService,DashboardStory)->
  render: (R,A)->
    DashboardService.getStorySummaries (sums)->
      A """
        <div class='stats'>
          <div class='iteration'>
            <div class='iterNum'>314</div>
            <div class='iterLabel'>ITERATION</div>
          </div>
          <div class='failingTests'>
            <div class='iconLabel'>
              <div class='icon'>x</div>
              <div class='label'>FAILING</div>
            </div>
          </div>
        </div>
        #{R sums, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')
   
