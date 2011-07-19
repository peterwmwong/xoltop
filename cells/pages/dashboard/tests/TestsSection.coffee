define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->
  render: (R,A)->
    S.dashboard.getStoryTestDetails @options.storynum, (tests)=>
      A [
        if tests?.length == 0
          R '.notests', 'No Tests'

        else
          R CatTable,
            categories:
              fail: 'Failing'
              towrite: 'To Write'
              pass: 'Passing'
            mapMember: ({status})-> status == 'na' and 'fail' or status
            columnMap:
              id:({id})->
                R 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xp.testnoteview.do?testNumber=#{id}"
                  id
                  
              name:({id,status,needsAttn,requirement})-> [
                if needsAttn then R 'span.needsAttn', 'NA'
                R 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xp.testnoteview.do?testNumber=#{id}"
                  requirement
              ]

              status: ({update})->update.status or ''
              date:   ({update:{date,isToday}})->
                if isToday then 'Today'
                else if date
                  "#{date.getMonth()+1}/#{date.getDate()}/#{date.getFullYear()}"
                else
                  ''
              owner:  ({update:{owner}})-> owner
            members: tests
      ]
