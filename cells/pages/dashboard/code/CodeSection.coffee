define ['Services','cell!shared/cattable/CatTable'], (S,CatTable)->

  render: (R,A)->
    S.dashboard.getStoryCodeTasksDetails @options.storynum, (codeTasks)=>
      A """
        <div class='newCodeTaskContainer'>
          <input class='newCodeTask' type='text' placeholder='+  Add a code task'></input>
        </div>
        #{R codeTasks?.length == 0 and "<div class='nocodetasks'>No Code Tasks</div>" or do=>
            storynum = @options.storynum
            R.cell CatTable,
            categories:
              notStarted:'Not Started'
              inProgress:'In Progress'
              complete:'Complete'
            mapMember: ({task:{status}})-> status
            columnMap:
              description: ({task:{id,description}})->
                "
                <a target='_blank' href='#{S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"}'>
                  #{description}
                </a>
                "
              owner: ({task:{owner}})-> owner
            members:codeTasks
        }
        """

  bind:
    'keyup .newCodeTask': ({which,target})->
      if which == 13
        target = $(target)
        codeTaskText = target.attr 'value'
        target.attr 'value', ''
        target.blur()


