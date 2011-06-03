# Mocks the Test Metrics Restful JSONP service (from the Destiny XPTool)
# To use this for testing, modify cells/data/MetricsService.{coffee,js}
# to point to where this is running (ex. http://localhost:6969)
$ = require('express').createServer()

defer = (f)-> setTimeout f,1000
root = '/xptool/rest/testmetrics'
send = (metrics)->
  (req,res)->
    # defer ->
      body = "#{JSON.stringify metrics}"
      res.send (cb = req.query.callback) and "#{cb}(#{body});" or body

metric = (o)->metrics: o
failingATs = (o)->failingATs: o

$.get "#{root}/releases", send [
   metric
      id: '20'
      name: '9.9'
      ats: 100
      chumpTasks: 200

   metric
      id: '21'
      name: '9.8'
      ats: 100
      chumpTasks: 200
      failingATs
         {"releaseId":20,"storyId":462,"testNumber":2272}
         {"releaseId":21,"storyId":462,"testNumber":2273}
]

$.get "#{root}/releases/:rid/iterations", send [
   metric
      id: 221
      name: 221
      ats: 50
      chumpTasks: 50
      failingATs
         {"releaseId":20,"storyId":462,"testNumber":2272}
         {"releaseId":21,"storyId":462,"testNumber":2273}
   metric
      id: 222
      name: 222
      ats: 50
      chumpTasks: 50
]

$.get "#{root}/releases/:rid/chumps", send [
   metric
      id: 999
      name: 'PW'
      ats: 75
      chumpTasks: 25
      failingATs
        {"releaseId":20,"storyId":462,"testNumber":2272}
        {"releaseId":21,"storyId":462,"testNumber":2273}
   metric
      id: 998
      name: 'EG'
      ats: 25
      chumpTasks: 75
]

$.get "#{root}/iterations/:iid/stories", send [
   metric
      id: 56265
      name: 'DCPI Title Details'
      ats: 15
      chumpTasks: 35
   metric
      id: 462
      name: 'RPS Label'
      ats: 35
      chumpTasks: 15
      failingATs
         {"releaseId":20,"storyId":462,"testNumber":2272}
         {"releaseId":21,"storyId":462,"testNumber":2273}
]


$.get "#{root}/releases/:rid/chumps/:cid/stories", send [
   metric
      id: 56265
      name: 'DCPI Title Details'
      ats: 15
      chumpTasks: 35
      failingATs
         {"releaseId":20,"storyId":462,"testNumber":2272}
         {"releaseId":21,"storyId":462,"testNumber":2273}
   metric
      id: 56264
      name: 'RPS Label'
      ats: 35
      chumpTasks: 15
      failingATs
         {"releaseId":20,"storyId":462,"testNumber":2272}
         {"releaseId":21,"storyId":462,"testNumber":2273}
]

$.listen 6969
