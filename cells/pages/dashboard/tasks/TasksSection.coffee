define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->

  render: (R,A)->
    DashboardService.getStoryTasksDetails @options.storynum, (tasks)=>
      A do=>
        if tasks?.length == 0
          "<div class='notests'>No Tasks</div>"
        else
          R.cell CatTable,
            categories:
              needsAttn:'Needs Attention'
              retest:'Retest'
              complete:'Complete'
            mapMember: ({task})->task.category
            columnMap:
              note: ({task:{note,chumpTaskID}})->
                """
                <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "projecttool/projecttool.taskview.do?taskID=#{chumpTaskID}"}'>
                  #{note}
                </a>
                """
              owner: ({task})->task.owner
            members:tasks

  bind:
    afterRender: ->
      @$('.column.note br').replaceWith "<div class='linebreak'></div>"
      
