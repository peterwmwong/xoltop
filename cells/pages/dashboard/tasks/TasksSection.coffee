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
          note: ({task:{note,id}})->
            """
            <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "xp.chumptaskview.do?storyNum=#{id}"}'>
              #{note}
            </a>
            """
          owner: ({task})->task.owner
        members:tasks

  bind:
    afterRender: ->
      @$('.column.note br').replaceWith "<div class='linebreak'></div>"
      
