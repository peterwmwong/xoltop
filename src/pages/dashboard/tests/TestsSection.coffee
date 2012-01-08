define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->
  
  render: (_)->
    S.dashboard.getStoryTestDetails @options.storynum, (tests)=>
      @$el.append [
        if tests?.length == 0
          _ '.notests', 'No Tests'

        else
          _ CatTable,
            categories:
              fail: 'Failing'
              towrite: 'To Write'
              pass: 'Passing'
            mapMember: ({status})-> status == 'na' and 'fail' or status
            columnMap:
              id:({id})->
                _ 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xp.testnoteview.do?testNumber=#{id}"
                  id
                  
              name:({id,status,needsAttn,requirement})-> [
                if needsAttn then _ 'span.needsAttn', 'NA'
                _ 'a',
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
      @loaded = true
      @$el.trigger 'loaded'