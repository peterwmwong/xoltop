define ['data/DashboardService','cell!./DashboardStory'], (DashboardService,DashboardStory)->
  render: (R,A)->
    DashboardService.getStorySummaries (sums)->
      A R sums, (story)-> R.cell DashboardStory, model:story
   
