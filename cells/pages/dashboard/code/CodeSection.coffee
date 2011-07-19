define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->

  render: (R,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A [
        R '.newCodeTaskContainer',
          R 'input.newCodeTask', type:'text', placeholder:'+  Add a code task'
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
      if which == 13
        target = $(target)
        codeTaskText = target.attr 'value'
        target.attr 'value', ''
        target.blur()


