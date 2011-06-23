define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->

  render: (R,A)->
    DashboardService.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      storynum = @options.storynum
      A R.cell CatTable,
        categories:
          notStarted:'Not Started'
          inProgress:'In Progress'
          complete:'Complete'
        mapMember: ({task:{status}})-> status
        columnMap:
          description: ({task:{id,description}})->
            """
            <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"}'>
              #{description}
            </a>
            """
          owner: ({task:{owner}})-> owner
        members:codeTasks
      
