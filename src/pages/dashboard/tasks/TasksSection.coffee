define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->

  render: (_)->
    S.dashboard.getStoryTasksDetails @options.storynum, (tasks)=>
      @$el.append [
        if tasks?.length == 0
          _ '.notests', 'No Tasks'
        else
          _ CatTable,
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
      @loaded = true
      @$el.trigger 'loaded'
