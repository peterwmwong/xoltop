define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->
  render: (R,A)->
    DashboardService.getStoryTasksDetails @options.storynum, (tasks)=>
      A R.cell CatTable,
        categories:
          needsAttn:'Needs Attention'
          retest:'Retest'
          complete:'Complete'
        mapMember: ({task})->task.category
        columnMap:
          note: ({task})->task.note
          owner: ({task})->task.owner
        members:tasks
