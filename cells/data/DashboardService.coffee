define ['data/JSONP'],(jsonp)->

  get = (path,done)->
    jsonp
      #url: 'http://destinyxptool/xptool/rest/jumbotron/iteration/'+path
      url: 'http://172.16.19.63:69/xptool/rest/jumbotron/iteration/'+path
      success: (dataArray)-> done dataArray
    return

  storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/

  StorySum = (obj)-> story: obj
  getStorySummaries: (done)->
    stories = [{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":2,"chumps":"(EG - CSZ)","description":"ECS - Standards Integration client.jar","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52314,"passingATs":0,"tasks":4,"unwrittenATs":0}},{"story":{"chumpTaskComplete":14,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(LL - LR)","description":"TECH  - state merge needs to be redesigned to be transactional for Destiny 10.0","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52601,"passingATs":1,"tasks":1,"unwrittenATs":0}},{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(PW)","description":"TECH - Performance for SC","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52841,"passingATs":0,"tasks":0,"unwrittenATs":0}},{"story":{"chumpTaskComplete":3,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(AB\/TF\/CM - MKC)","description":"TM - STATE - Restrict Titles from Ordering","failingATs":3,"inProgressATs":0,"needsAttentionATs":0,"num":52493,"passingATs":10,"tasks":2,"unwrittenATs":6}},{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(JW\/BP - FM)","description":"TECH  - state synch queue refactor - keep record of failed synch actions - required for 10.0","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52600,"passingATs":0,"tasks":2,"unwrittenATs":0}}]
 
    #get 'stories', (stories)->
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

  getStoryTestDetails : do->
    parseUpdate = do->
      ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/
      isToday = do->
        y = (today = new Date()).getYear()
        m = today.getMonth()
        d = today.getDate()
        (o)-> y == o.getYear() and m == o.getMonth() and d == o.getDate()
      (ownerString)->
        match = ownerRegex.exec ownerString
        owner: match[1]
        status: match[2].trim()
        date: (d = new Date match[5])
        isToday: isToday(d)

    parseTestName = do->
      testRegex = /^test\d+_(.*)$/
      (testName)-> testRegex.exec(testName)[1]

    test = (id,name,owner,status)->{id:id,name:name,owner:owner,status:status ? 'passing'}
    today = "#{(t = new Date()).getMonth()+1}/#{t.getDate()}/#{t.getFullYear()}"

    (storynum,done)->
      testDetails =
        storynum: storynum
        tests: [
          test(29946,"test29946_QuestBookClubCreateShelvesBookStaysInAssignedShelf",'twalker Passes locally - 10/27/2010','failing'),
          test(30030,"test30030_StateRestrictTitlesFromOrdering_SiteRestrictedTitles_TitleDetailsLink",'dwatling In Progress 1/4/2010','passing')
          test(30031,"test30031_StateRestrictTitlesFromOrdering_PreOrder_Programs_UnrestrictedTitle",'tfeldmann In Progress 1/13/2010',''),
          test(26787,"test26787_QuestBookClubCreateShelvesIfItemExistsInOneShelfAndAddedToAnotherItWillBeMoved",'pwong Fixed - '+today,'failing'),
        ]
      #get "stories/#{storynum}/tests", (testDetails)->
      do(testDetails)->
        # Categorize each test
        tests = passing:[], failing:[], towrite:[]
        for t in testDetails.tests
          t.category =
            if t.status in ['passing','failing'] then t.status
            else
              'towrite'
          t.update = parseUpdate t.owner
          t.name = parseTestName t.name
          tests[t.category].push t

        # Sort each category by
        for cat,array of tests
          array.sort (a,b)-> a.id - b.id

        # Replace array of all tests with new hash of categorized tests
        testDetails.tests = tests
        console.log testDetails
        done testDetails

  getStoryTaskDetails: (storynum,done)->
    taskDetails = [
      {
        id:12499,name:'Patron Comments Global Delete',owner:'JW',
        tasks:
          needsAttn: [
            {id: 55555, note:'Please change the permission description', updatedBy:'lrossell'}
            {id: 55556, note:'When viewing My Quest Updates when someone made a comment on my shelf mov', updatedBy:'lrossell'}
          ]
          retest:[
            {id: 55557, note:'Stuff', updatedBy:'pwong'}
            {id: 55558, note:'Stuffy 2', updatedBy:'pwong'}
          ]
      }
      {
        id:12504,name:'DB Upgrade and Cleanup Script',owner:'TF',
        tasks:
          needsAttn:[
            {id: 55555, note:'DB Please change the permission description', updatedBy:'lrossell'}
            {id: 55556, note:'DB When viewing My Quest Updates when someone made a comment on my shelf mov', updatedBy:'lrossell'}
          ]
          retest:[
            {id: 55557, note:'DB Stuff', updatedBy:'pwong'}
            {id: 55558, note:'DB Stuffy 2', updatedBy:'pwong'}
          ]
      }
    ]
    done taskDetails
    #get "stories/#{storynum}/tasks", (taskDetails)->done taskDetails



