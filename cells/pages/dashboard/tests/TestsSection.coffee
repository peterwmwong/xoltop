define ['data/DashboardService','cell!shared/cattable/CatTable'], (DashboardService,CatTable)->
  render: (R,A)->
    DashboardService.getStoryTestDetails @options.storynum, (tests)=>
      A do=>
        if tests?.length == 0
          "<div class='notests'>No Tests</div>"
        else
          R.cell CatTable,
            categories:
              fail: 'Failing'
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
              name:({id,status,needsAttn,requirement})->
                """
                #{R needsAttn == true and "<span class='needsAttn'>NA</span>"}
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

