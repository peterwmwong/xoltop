define [
  'Services'
  'cell!shared/cattable/CatTable'
  'cell!shared/aedinput/AEDInput'
], (S,CatTable,AEDInput)->

  render: (o,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A [
        o '.addTask',
          o '.addButton',
            o 'span.plus', '+'
            'Add Task'
          o AEDInput, class: 'codeTaskInput', placeholder: '... add a new code task', disableDelete: true
        if codeTasks?.length is 0
          o 'div.nocodetasks', 'No Code Tasks'
        else
          storynum = @options.storynum
          o CatTable,
            categories:
              notStarted: 'Not Started'
              inProgress: 'In Progress'
              complete:   'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              description: ({task:{id,description}})->
                o AEDInput, value: description
                ###
                o 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                  description
                ###
              owner: ({task:{owner}})-> owner
            members:codeTasks
      ]

  bind:
    'delete .AEDInput': -> #TODO: do delete
