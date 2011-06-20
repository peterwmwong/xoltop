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
          expandCollapse: -> "<a href='#'></a>"
          note: ({task})->task.note
          owner: ({task})->task.owner
        members:tasks

  bind:
    afterRender: ->
      @$('.column.note br').replaceWith "<div class='linebreak'></div>"

    'click .column.note, .column.expandCollapse > a': (ev)->
      $row = $(ev.target).closest('tr')
      $('.column.expandCollapse',$row).toggleClass 'showLess'
      $('.column.note',$row).toggleClass 'expanded'
      
