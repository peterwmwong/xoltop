define ['data/JSONP'],(jsonp)->

  url = 'http://localhost:6969/xptool/rest/testmetrics/'
  #url = 'http://destinyxptool/xptool/rest/testmetrics/'
  get = jsonp.makeget url,
    callback: 'callback'
    process: (rs)->m.metrics for m in rs

  getReleases: get 'releases'

  getReleaseIterations: get (releaseid)->
    'releases/'+releaseid+'/iterations'

  getReleaseChumps: get (releaseid)->
    'releases/'+releaseid+'/chumps'

  getReleaseIterationStories: get (releaseIterationIds)->
    'iterations/'+releaseIterationIds.iteration+'/stories'

  getReleaseChumpStories: get (releaseChumpIds)->
    'releases/'+releaseChumpIds.release+'/chumps/'+releaseChumpIds.chump+'/stories'
