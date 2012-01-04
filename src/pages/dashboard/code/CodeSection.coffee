define [
  'Services'
  'cell!shared/cattable/CatTable'
  'cell!shared/aedinput/AEDInput'
], (S,CatTable,AEDInput)->

  render: (_)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      @$el.append [
        if codeTasks?.length is 0
          _ 'div.nocodetasks', 'No Code Tasks'
        else
          storynum = @options.storynum
          _ CatTable,
            categories:
              notStarted:"Not Started"
              inProgress:'In Progress'
              complete:'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              description: ({task:{id,description}})->
                _ 'a',
                  target: '_blank'
                  href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                  description
              owner: ({task:{owner}})-> owner
            members:codeTasks
      ]
      @$el.trigger 'loaded'

  on:
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
