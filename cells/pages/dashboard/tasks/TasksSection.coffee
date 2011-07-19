define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->

  render: (R,A)->
    S.dashboard.getStoryTasksDetails @options.storynum, (tasks)=>
      A [
        if tasks?.length == 0
          R '.notests', 'No Tasks'
        else
          R CatTable,
            categories:
              needsAttn:'Needs Attention'
              retest:'Retest'
              complete:'Complete'
            mapMember: ({task})->task.category
            columnMap:
              note: ({task:{note,chumpTaskID}})->
                $("<a target='_blank' href='#{S.getXPToolBaseUrl "projecttool/projecttool.taskview.do?taskID=#{chumpTaskID}"}'>
                    #{note}
                   </a>")[0]
              owner: ({task})->task.owner
            members:tasks
      ]
