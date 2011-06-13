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
          showMoreLess: -> "<a class='more'>More</a><a class='less'>Less</a>"
          owner: ({task})->task.owner
        members:tasks

  bind:
    afterRender: ->
      @$('.column.note br').replaceWith "<div class='linebreak'></div>"

    'click .column.showMoreLess > a': (ev)->
      $target = $(ev.target)
      $target.parent().toggleClass 'showLess'
      $('.column.note',$target.closest('tr')).toggleClass 'expanded'
      
