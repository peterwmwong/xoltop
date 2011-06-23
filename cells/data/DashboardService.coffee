define ['data/JSONP'], (jsonp)->
  TESTING = window.xoltop?.DashboardService?.useMockData

  xptoolurl = (path)-> getXPToolBaseUrl "rest/jumbotron/#{path}"
  get = do->
    defer = (f)-> setTimeout f, 0
    (testpath,url,done)->
      if TESTING
        defer -> require [testpath], done
      else
        jsonp
          #url: 'http://destinyxptool/xptool/rest/jumbotron/iteration/'+path
          callback: 'jsonp'
          url: url
          success: done
      return
 

  #getXPToolBaseUrl: getXPToolBaseUrl = (relPath)-> "http://172.16.0.230/xptool/#{relPath}"
  getXPToolBaseUrl: getXPToolBaseUrl = (relPath)-> "http://172.16.19.63:69/xptool/#{relPath}"

  getCurrentIterationNumber: (done)->
    get 'data/MockDashboardService-getCurrentIterationNumber',
      xptoolurl "/iteration/current"
      ({iterationInfo:{iterationNo}})-> done iterationNo

  getIterationTestStatus: (done)->
    get 'data/MockDashboardService-getIterationTestStatus',
      xptoolurl "iteration/tests"
      ({test})-> done test

  getRecentTestResults: (type,done)->
    if type in ['ats','units']
      get "data/MockDashboardService-getRecentTestResults-#{type}",
        xptoolurl "tests/#{type}?recent=10"
        done
    else if type is 'smalls'
      get 'data/MockDashboardService-getRecentTestResults-smalls',
        "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json"
        done

  getTestStatus: (done)->
    get 'data/MockDashboardService-getTestStatus',
      xptoolurl "testsnapshot"
      ({tests})->
        get 'data/MockDashboardService-getTestStatus-smallTests',
          "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json"
          ({failCount})->
            tests.failingSmalls = failCount
            done tests

  getStoryCodeTasksDetails: (storynum,done)->
    get 'data/MockDashboardService-getStoryCodeTasksDetail',
      xptoolurl "iteration/stories/#{storynum}/codeTasks"
      done

  getStoryTasksDetails: (storynum,done)->
    get 'data/MockDashboardService-getStoryTasksDetail',
      xptoolurl "iteration/stories/#{storynum}/tasks"
      done

  getStorySummaries: do->
    storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/
    getStatus = ({codeCompletePct,ats,tasks})->
      if codeCompletePct < 100
        0
      else if ats.failing + tasks.needsAttn
        0
      else if ats.unwritten + tasks.retest
        1
      else
        2
    (iterNo,done)->
      get 'data/MockDashboardService-getStorySummaries',
        xptoolurl "iteration/#{iterNo? and "#{iterNo}/" or ""}stories/"
        ({iterationStories:{iterationNo,stories}})->
          stories = do->
            for s in stories.sort( ({num:a},{num:b})->a-b )
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
          
          stories.sort (a,b)->
            getStatus(a) - getStatus(b)

          done {stories,iterationNo}

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

    (storynum,done)->
      get 'data/MockDashboardService-getStoryTestDetails',
        xptoolurl "iteration/stories/#{storynum}/tests"
        (tests)->
          tests = for {test:t} in tests
            t.status = t.status in ['pass','fail','na','towrite'] and t.status or 'unknown'
            t.update = parseUpdate t.owner
            t

          # Sort each category by
          tests.sort ({id:a},{id:b})->a-b

          # Replace array of all tests with new hash of categorized tests
          done tests
