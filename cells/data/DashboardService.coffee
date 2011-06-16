define ['data/JSONP'],(jsonp)->
  TESTING = true

  xptoolurl = (path)->
    "http://172.16.19.63:69/xptool/rest/jumbotron/#{path}"

  get = (testpath,url,done)->
    if TESTING
      require [testpath], done
    else
      jsonp
        #url: 'http://destinyxptool/xptool/rest/jumbotron/iteration/'+path
        url: url
        success: done
    return

  getIterationTestStatus: (done)->
    get 'data/MockDashboardService-getIterationTestStatus',
      xptoolurl "iteration/tests"
      ({test})-> done test

  getTestStatus: (done)->
    get 'data/MockDashboardService-getTestStatus',
      xptoolurl "testsnapshot"
      ({tests})->
        get 'data/MockDashboardService-getTestStatus-smallTests',
          "http://HUDSON-URL"
          ({failures})->
            tests.failingSmalls = failures
            done tests


  getStoryTasksDetails: (storynum,done)->
    get 'data/MockDashboardService-getStoryTasksDetail',
      xptoolurl "iteration/stories/#{storynum}/tasks"
      done

  getStorySummaries: do->
    storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/
    (done)->
      get 'data/MockDashboardService-getStorySummaries',
        xptoolurl 'iteration/stories/'
        (stories)->
          done do-> for {story:s} in stories.sort( ({story:a},{story:b})->a.num-b.num )
            story =
              codeCompletePct: s.codeCompletePct
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

  getStoryTestDetails : do->
    parseUpdate = do->
      ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/
      developerRegex = /^Developer/
      isToday = (o)->
        (today = new Date()).getYear() == o.getYear() and
          today.getMonth() == o.getMonth() and
          today.getDate() == o.getDate()

      (ownerString)->
        if match = ownerRegex.exec(ownerString)
          owner: match[1]
          status: match[2].trim()
          date: (d = new Date match[5])
          isToday: isToday(d)
        else
          owner: 'Developer'
          status: ''
          date: ''
          isToday: false

    parseTestName = do->
      testRegex = /^test\d+_(.*)$/
      (testName)-> testRegex.exec(testName)[1]

    today = "#{(t = new Date()).getMonth()+1}/#{t.getDate()}/#{t.getFullYear()}"

    (storynum,done)->
      get 'data/MockDashboardService-getStoryTestDetails',
        xptoolurl "iteration/stories/#{storynum}/tests"
        (tests)->
          tests = for {test:t} in tests
            t.status = t.status in ['pass','fail','towrite'] and t.status or 'unknown'
            t.update = parseUpdate t.owner
            t

          # Sort each category by
          tests.sort ({id:a},{id:b})->a-b

          # Replace array of all tests with new hash of categorized tests
          done tests
