define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->

  render: (R,A)->
    DashboardService.getStoryTestDetails @options.storynum, (tests)=>
      A R.cell CatTable,
        categories:
          failing: 'Failing'
          towrite: 'To Write'
          passing: 'Passing'
        mapMember: ({category})->category
        columnMap:
          id:'id'
          name:'name'
          status: ({update})-> update.status
          date:   ({update:{date:d,isToday}})->
            if isToday then 'Today'
            else "#{d.getMonth()+1}/#{d.getDate()}/#{d.getFullYear()}"
          owner:  ({update})-> update.owner
        members: tests

