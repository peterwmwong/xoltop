define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->

  render: (R,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A [
        R '.newCodeTaskContainer',
          R '.addButton',
            R 'span.plus', '+'
            'Add'
          R 'input.newCodeTask', type:'text', placeholder:'... a new code task'
        if codeTasks?.length is 0
          R 'div.nocodetasks', 'No Code Tasks'
        else
          storynum = @options.storynum
          R CatTable,
            categories:
              notStarted:'Not Started'
              inProgress:'In Progress'
              complete:'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              description: ({task:{id,description}})->
                R 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                  description
              owner: ({task:{owner}})-> owner
            members:codeTasks
      ]

  bind:
    'keyup .newCodeTask': ({which,target})->
      blankOutInput = ->
        target.attr 'value', ''
        target.blur()
        
      switch which
        when 27 # <ESC>
          blankOutInput()

        when 13 # <ENTER>
          target = $(target)
          codeTaskText = target.attr 'value'
          blankOutInput()


