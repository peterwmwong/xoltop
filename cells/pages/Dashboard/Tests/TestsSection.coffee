define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->
  defer = (f)-> setTimeout f,1000
  render: (R,A)->
    DashboardService.getStoryTestDetails @options.storynum, (tests)=>
      A R.cell CatTable,
        categories:
          fail: 'Failing'
          towrite: 'To Write'
          pass: 'Passing'
        mapMember: ({status})->status
        columnMap:
          id:'id'
          name:'requirement'
          status: ({update})->update.status or ''
          date:   ({update:{date,isToday}})->
            if isToday then 'Today'
            else if date
              "#{date.getMonth()+1}/#{date.getDate()}/#{date.getFullYear()}"
            else
              ''
          owner:  ({update:{owner}})-> owner
        members: tests

