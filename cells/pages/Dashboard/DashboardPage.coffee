define ['data/DashboardService','cell!./DashboardStory'], (DashboardService,DashboardStory)->
  render: (R,A)->
    DashboardService.getStorySummaries (sums)->
      A R sums, (story)-> R.cell DashboardStory, model:story

  bind:
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')
   
