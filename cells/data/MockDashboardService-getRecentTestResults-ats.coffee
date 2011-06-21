define [], ->
  for i in [0...10] then do->
    testResult:
      datetime: 'Sun Jun 1'+i+' 2011 19:35:03 GMT-0500 (CDT)'
      failures: Math.floor Math.random()*50+100
      runid: 1230+i
