define ['data/JSONP'],(jsonp)->
  O = (obj)->obj

  get = (path,done)->
    jsonp
      #url: 'http://destinyxptool/xptool/rest/jumbotron/iteration/'+path
      url: 'http://172.16.19.63:69/xptool/rest/jumbotron/iteration/'+path
      success: (dataArray)-> done dataArray
    return

  storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/

  StorySum = (obj)-> story: obj


  getStoryTasksDetails: (storynum,done)->
    # <TESTING ONLY>
    tmp = 12345
    tasks = [
      O id: tmp++, status:"needsAttn", name:"Citation button doesn't is unclickable after doing the following: blah blah blah", owner: "jwright"
      O id: tmp++, status:"retest", name:"There's no way to print citations of digtal resources in Quest", owner:"pwong"
      O id: tmp++, status:"complete", name:"Digital Resource citations are printed in library citation report", owner:"jwright"
      O id: tmp++, status:"complete", name:"Server error on library citation report after saving a citation", owner:"jwright"
      O id: tmp++, status:"needsAttn", name:"Date of composition text input is justified right on edit citation form", owner:"twalker"
    ]
    # </Testing ONLY>

    #get "stories/#{storynum}/tasks", (tasks)->
    do -> # TESTING ONLY
      done tasks

  getStorySummaries: (done)->
    # <TESTING ONLY>
    stories = [{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":2,"chumps":"(EG - CSZ)","description":"ECS - Standards Integration client.jar","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52314,"passingATs":0,"tasks":4,"unwrittenATs":0}},{"story":{"chumpTaskComplete":14,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(LL - LR)","description":"TECH  - state merge needs to be redesigned to be transactional for Destiny 10.0","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52601,"passingATs":1,"tasks":1,"unwrittenATs":0}},{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(PW)","description":"TECH - Performance for SC","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52841,"passingATs":0,"tasks":0,"unwrittenATs":0}},{"story":{"chumpTaskComplete":3,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(AB\/TF\/CM - MKC)","description":"TM - STATE - Restrict Titles from Ordering","failingATs":3,"inProgressATs":0,"needsAttentionATs":0,"num":52493,"passingATs":10,"tasks":2,"unwrittenATs":6}},{"story":{"chumpTaskComplete":0,"chumpTaskNA":0,"chumpTaskRetest":0,"chumps":"(JW\/BP - FM)","description":"TECH  - state synch queue refactor - keep record of failed synch actions - required for 10.0","failingATs":0,"inProgressATs":0,"needsAttentionATs":0,"num":52600,"passingATs":0,"tasks":2,"unwrittenATs":0}}]
    # </TESTING ONLY>
    
    #get 'stories', (stories)->
    do -> # TESTING ONLY
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

    today = "#{(t = new Date()).getMonth()+1}/#{t.getDate()}/#{t.getFullYear()}"

    (storynum,done)->
      # <Testing ONLY>
      testDetails =
        storynum: storynum
        tests: [
          O id:29946, name:"test29946_QuestBookClubCreateShelvesBookStaysInAssignedShelf", owner:'twalker Passes locally - 10/27/2010',status:'failing'
          O id:30030, name:"test30030_StateRestrictTitlesFromOrdering_SiteRestrictedTitles_TitleDetailsLink", owner:'dwatling In Progress 1/4/2010', status:'passing'
          O id:30031, name:"test30031_StateRestrictTitlesFromOrdering_PreOrder_Programs_UnrestrictedTitle", owner:'tfeldmann In Progress 1/13/2010', status:''
          O id:26787, name:"test26787_QuestBookClubCreateShelvesIfItemExistsInOneShelfAndAddedToAnotherItWillBeMoved",owner:'pwong Fixed - '+today, status:'failing'
        ]
      # </Testing ONLY>
      
      #get "stories/#{storynum}/tests", ({tests})->
      do(testDetails)-> # TESTING ONLY
        {tests} = testDetails # TESTING ONLY

        for t in tests
          t.category =
            if t.status in ['passing','failing'] then t.status
            else
              'towrite'
          t.update = parseUpdate t.owner
          t.name = parseTestName t.name

        # Sort each category by
        tests.sort ({id:a},{id:b})->a-b

        # Replace array of all tests with new hash of categorized tests
        done tests

  getStoryTaskDetails: (storynum,done)->
    # <TESTING ONLY>
    taskDetails = [
      O
        id:12499
        name:'Patron Comments Global Delete'
        owner:'JW'
        tasks:
          needsAttn: [
            O id: 55555, note:'Please change the permission description', updatedBy:'lrossell'
            O id: 55556, note:'When viewing My Quest Updates when someone made a comment on my shelf mov', updatedBy:'lrossell'
          ]
          retest:[
            O id: 55557, note:'Stuff', updatedBy:'pwong'
            O id: 55558, note:'Stuffy 2', updatedBy:'pwong'
          ]
      O
        id:12504
        name:'DB Upgrade and Cleanup Script'
        owner:'TF'
        tasks:
          needsAttn:[
            O id: 55555, note:'DB Please change the permission description', updatedBy:'lrossell'
            O id: 55556, note:'DB When viewing My Quest Updates when someone made a comment on my shelf mov', updatedBy:'lrossell'
          ]
          retest:[
            O id: 55557, note:'DB Stuff', updatedBy:'pwong'
            O id: 55558, note:'DB Stuffy 2', updatedBy:'pwong'
          ]
    ]
    # </TESTING ONLY>

    #get "stories/#{storynum}/tasks", (taskDetails)->done taskDetails
    do-> # TESTING ONLY
      done taskDetails



