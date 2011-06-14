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
            <div class='icon'>FAILING</div>
            <div class='label'>&nbsp;</div>
          </div>
          <div class='ATCount'>
            <div class='count'>180</div>
            <div class='label'>AT</div>
          </div>
          <div class='UnitCount'>
            <div class='count'>50</div>
            <div class='label'>UNIT</div>
          </div>
          <div class='SmallCount'>
            <div class='count allPassing'>0</div>
            <div class='label'>SMALL</div>
          </div>
        </div>
        #{R sums, (story)-> R.cell DashboardStory, model:story}
        """

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')
   
