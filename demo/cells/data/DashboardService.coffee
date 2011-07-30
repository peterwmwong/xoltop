define ['data/JSONP'],({JSONPService,getXPToolBaseUrl})->
  new JSONPService 'Dashboard'
    baseURL: getXPToolBaseUrl 'rest/jumbotron/'
    methods:

      getCurrentIterationNumber:
        path: 'iteration/current'
        process: ({iterationInfo:{iterationNo}})-> iterationNo
      
      getIterationTestStatus:
        path: 'iteration/tests'
        process: ({test})-> test

      getRecentTestResults: (type)->
        (type in ['ats','units']) and "tests/#{type}?recent=10"

      getStoryCodeTasksDetails: (storynum)->
        "iteration/stories/#{storynum}/codeTasks"

      getStoryTasksDetails: (storynum)->
        "iteration/stories/#{storynum}/tasks"

      getStorySummaries: do->
        chumpRegex = /^\((.*)\)$/
        storyRegex = /^((\w|\/)+[ ]+- )*(.*)$/
        path: (iterNo)-> "iteration/#{iterNo? and "#{iterNo}/" or ""}stories/"
        process:({iterationStories:{iterationNo,stories}})->
          stories = for s in stories
            [devs,testers] =
              for names in chumpRegex.exec(s.chumps)?[1]?.split(' - ') or []
                for n in names.split '/'
                  n.toUpperCase()

            storynum: s.num
            name: storyRegex.exec(s.description)?[3]
            codeCompletePct: s.codeCompletePct
            codeTasksIncomplete: s.codeTasksIncomplete
            codeTasks: codeTasks =
              completePct: s.codeCompletePct
              notStarted: s.notStartedCodeTasks or 0
              inProgress: s.inProgressCodeTasks or 0
              completed: s.completedCodeTasks or 0
            ats: ats =
              failing: s.failingATs
              needsAttn: s.needsAttentionATs
              unwritten: s.unwrittenATs
              total: atTotal = s.failingATs + s.passingATs + s.unwrittenATs
            tasks: tasks =
              needsAttn: s.chumpTaskNA
              retest: s.chumpTaskRetest
              completed: s.chumpTaskComplete
            testers: testers or []
            devs: devs or []
            status: do->
              if atTotal == 0 or (codeTasks.notStarted + ats.failing + ats.needsAttn + tasks.needsAttn)
                0
              else if codeTasks.inProgress + ats.unwritten + tasks.retest
                1
              else
                2

          # Order by status then story num
          stories.sort (a,b)-> (a.status - b.status) or (a.storynum - b.storynum)
          {stories,iterationNo}


      getStoryTestDetails : do->
        isToday = (o)->
          (today = new Date()).getYear() == o.getYear() and
            today.getMonth() == o.getMonth() and
            today.getDate() == o.getDate()

        parseUpdate = do->
          ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/
          developerRegex = /^Developer/
          (ownerString)->
            if match = ownerRegex.exec(ownerString)
              owner: match[1]
              status: match[2].trim()
              date: (d = new Date match[5])
              isToday: isToday d
            else
              owner: 'Developer'
              status: ''
              date: ''
              isToday: false

        parseTestName = do->
          testRegex = /^test\d+_(.*)$/
          (testName)-> testRegex.exec(testName)[1]

        today = "#{(t = new Date()).getMonth()+1}/#{t.getDate()}/#{t.getFullYear()}"

        path: (storynum,done)-> "iteration/stories/#{storynum}/tests"
        process: (tests)->
          tests = for {test:t} in tests
            t.status = t.status in ['pass','fail','na','towrite'] and t.status or 'unknown'
            t.update = parseUpdate t.owner
            t

          # Sort each category by
          tests.sort ({id:a},{id:b})->a-b

          # Replace array of all tests with new hash of categorized tests
          tests