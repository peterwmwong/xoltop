define [
  'Services'
  'cell!shared/cattable/CatTable'
  'cell!shared/aedinput/AEDInput'
], (S,CatTable,AEDInput)->

  render: (o,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A [
        o AEDInput, class: 'codeTaskInput', placeholder: '... add a new code task'
        if codeTasks?.length is 0
          o 'div.nocodetasks', 'No Code Tasks'
        else
          storynum = @options.storynum
          o CatTable,
            categories:
              notStarted:"Not Started<span class='plus'>+</span>"
              inProgress:'In Progress'
              complete:'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              description: ({task:{id,description}})->
                o 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                  description
              owner: ({task:{owner}})-> owner
            members:codeTasks
      ]

  bind:
    'click .CatTable .header > .plus': ->
      @$('.CatTable > .category.notStarted > .members').prepend new AEDInput().el

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


