define ['data/JSONP'],(jsonp)->
  O = (obj)->obj
  TESTING = true

  get = (path,done)->
    jsonp
      #url: 'http://destinyxptool/xptool/rest/jumbotron/iteration/'+path
      url: 'http://172.16.19.63:69/xptool/rest/jumbotron/iteration/'+path
      success: (dataArray)-> done dataArray
    return

  storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/

  getStoryTasksDetails: (storynum,done)->
    doDone = (chumpTasks)-> done chumpTasks
    if TESTING
      require ['data/MockDashboardService-getStoryTasksDetail'], doDone
    else
      get "stories/#{storynum}/tasks", doDone

  getStorySummaries: (done)->
    doDone = (stories)->
      done do-> for {story:s} in stories.sort( ({story:a},{story:b})->a.num-b.num )
        story =
          type: 'story'
          ats:
            failing: s.failingATs
            unwritten: s.unwrittenATs
            total: s.failingATs + s.passingATs + s.unwrittenATs
          tasks:
            retest: s.chumpTaskRetest
            needsAttn: s.chumpTaskNA
            total: s.chumpTaskComplete

        if match = storyRegex.exec s.description+' '+s.chumps
          [devs,testers] = match[5] and match[5]?.split(' - ') or []
          story.storynum = s.num
          story.name = match[3]
          story.testers = testers?.split '/'
          story.devs = devs?.split '/'
          story.tags = match[1]?.split(' - ')?.slice 0, -1
        story

    if TESTING
      require ['data/MockDashboardService-getStorySummaries'], doDone
    else
      get 'stories', doDone

  getStoryTestDetails : do->
    parseUpdate = do->
      ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/
      developerRegex = /^Developer/
      isToday = do->
        y = (today = new Date()).getYear()
        m = today.getMonth()
        d = today.getDate()
        (o)-> y == o.getYear() and m == o.getMonth() and d == o.getDate()
      (ownerString)->
        match = ownerRegex.exec ownerString
        if match
          owner: match[1]
          status: match[2].trim()
          date: (d = new Date match[5])
          isToday: isToday(d)
        else# if developerRegex.exec ownerString
          owner: 'Developer'
          status: ''
          date: ''
          isToday: false

    parseTestName = do->
      testRegex = /^test\d+_(.*)$/
      (testName)-> testRegex.exec(testName)[1]

    today = "#{(t = new Date()).getMonth()+1}/#{t.getDate()}/#{t.getFullYear()}"

    (storynum,done)->
      doDone = (tests)->
        #do(tests)-> # TESTING ONLY
        tests = for {test:t} in tests
          t.status =
            if t.status in ['pass','fail','towrite'] then t.status
            else
              'unknown'
          t.update = parseUpdate t.owner
          t

        # Sort each category by
        tests.sort ({id:a},{id:b})->a-b

        # Replace array of all tests with new hash of categorized tests
        done tests

      if TESTING
        require ['data/MockDashboardService-getStoryTestDetails'], doDone
      else
        get "stories/#{storynum}/tests", doDone
