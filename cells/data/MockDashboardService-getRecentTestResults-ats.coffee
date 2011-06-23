define [], ->
  for i in [0...10] then do->
    testResult:
      datetime: 'Sun Jun 2'+i+' 2011 19:35:03 GMT-0500 (CDT)'
      failures: if (i+1)%3 then Math.floor Math.random()*50+100 else 0
      runid: 1230+i
