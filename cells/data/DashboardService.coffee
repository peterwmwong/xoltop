define ['data/JSONP'], ({get,serviceurl})->

  getCurrentIterationNumber: (done)->
    get
      mock: 'data/mock/MockDashboardService-getCurrentIterationNumber',
      real: serviceurl "iteration/current"
      ({iterationInfo:{iterationNo}})-> done iterationNo


  getIterationTestStatus: (done)->
    get
      mock: 'data/mock/MockDashboardService-getIterationTestStatus',
      real: serviceurl "iteration/tests"
      ({test})-> done test


  getRecentTestResults: (type,done)->
    if type in ['ats','units']
      get
        mock: "data/mock/MockDashboardService-getRecentTestResults-#{type}",
        real: serviceurl "tests/#{type}?recent=10"
        done
    else if type is 'smalls'
      get
        mock: 'data/mock/MockDashboardService-getRecentTestResults-smalls',
        real: "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json"
        done


  getStoryCodeTasksDetails: (storynum,done)->
    get
      mock: 'data/mock/MockDashboardService-getStoryCodeTasksDetail',
      real: serviceurl "iteration/stories/#{storynum}/codeTasks"
      done


  getStoryTasksDetails: (storynum,done)->
    get
      mock: 'data/mock/MockDashboardService-getStoryTasksDetail',
      real: serviceurl "iteration/stories/#{storynum}/tasks"
      done


  getStorySummaries: do->
    storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/
    getStatus = ({codeCompletePct,ats,tasks})->
      if codeCompletePct < 100 or ats.total == 0
        0
      else if ats.failing + tasks.needsAttn
        0
      else if ats.unwritten + tasks.retest
        1
      else
        2
    (iterNo,done)->
      get
        mock: 'data/mock/MockDashboardService-getStorySummaries',
        real: serviceurl "iteration/#{iterNo? and "#{iterNo}/" or ""}stories/"
        ({iterationStories:{iterationNo,stories}})->
          stories = do->
            for s in stories.sort( ({num:a},{num:b})->a-b )
              story =
                codeCompletePct: s.codeCompletePct
                codeTasksIncomplete: s.codeTasksIncomplete
                type: 'story'
                ats:
                  failing: s.failingATs
                  unwritten: s.unwrittenATs
                  needsAttn: s.needsAttentionATs
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
      get
        mock: 'data/mock/MockDashboardService-getStoryTestDetails',
        real: serviceurl "iteration/stories/#{storynum}/tests"
        (tests)->
          tests = for {test:t} in tests
            t.status = t.status in ['pass','fail','na','towrite'] and t.status or 'unknown'
            t.update = parseUpdate t.owner
            t

          # Sort each category by
          tests.sort ({id:a},{id:b})->a-b

          # Replace array of all tests with new hash of categorized tests
          done tests
