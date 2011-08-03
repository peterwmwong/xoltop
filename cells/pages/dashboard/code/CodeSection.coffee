define [
  'Services'
  'cell!shared/cattable/CatTable'
  'cell!shared/aedinput/AEDInput'
], (S,CatTable,AEDInput)->

  render: (_,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A [
        _ '.addTask',
          _ '.addButton',
            _ 'span.plus', '+'
            'Add Task'
          _ AEDInput, class: 'codeTaskInput', placeholder: '... add a new code task', disableDelete: true
        if codeTasks?.length is 0
          _ 'div.nocodetasks', 'No Code Tasks'
        else
          storynum = @options.storynum
          _ CatTable,
            categories:
              notStarted: 'Not Started'
              inProgress: 'In Progress'
              complete:   'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              owner: ({task:{owner}})-> owner
              description: ({task:{id,description}})->
                _ AEDInput, value: description
                ###
                _ 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                  description
                ###
            members:codeTasks
      ]

  bind:
    'delete .AEDInput': -> #TODO: do delete
