define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->
  render: (R,A)->
    DashboardService.getStoryTestDetails @options.storynum, (tests)=>
      A R.cell CatTable,
        categories:
          fail: 'Failing / NA'
          towrite: 'To Write'
          pass: 'Passing'
        mapMember: ({status})-> status == 'na' and 'fail' or status
        columnMap:
          id:({id})->
            """
            <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "xp.testnoteview.do?testNumber=#{id}"}'>
              #{id}
            </a>
            """
          name:({id,status,requirement})->
            """
            #{R status == 'na' and "<span class='needsAttn'>NA</span>"}
            <a target='_blank' href='#{DashboardService.getXPToolBaseUrl "xp.testnoteview.do?testNumber=#{id}"}'>
              #{requirement}
            </a>
            """
          status: ({update})->update.status or ''
          date:   ({update:{date,isToday}})->
            if isToday then 'Today'
            else if date
              "#{date.getMonth()+1}/#{date.getDate()}/#{date.getFullYear()}"
            else
              ''
          owner:  ({update:{owner}})-> owner
        members: tests

