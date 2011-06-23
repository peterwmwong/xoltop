define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->

  render: (R,A)->
    DashboardService.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A R.cell CatTable,
        categories:
          notStarted:'Not Started'
          inProgress:'In Progress'
          complete:'Complete'
        mapMember: ({task:{status}})-> status
        columnMap:
          description: ({task:{id,description}})->
            """
            <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "xp.taskview.do?taskId=#{id}"}'>
              #{description}
            </a>
            """
          owner: ({task:{owner}})-> owner
        members:codeTasks
      
