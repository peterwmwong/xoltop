define ['data/JSONPService'],({JSONPService,getXPToolBaseUrl})->
  new JSONPService 'Metrics'
    baseURL: getXPToolBaseUrl 'rest/testmetrics/'
    process: (rs)-> m.metrics for m in rs
    methods:
      getReleases: 'releases'
      getReleaseIterations: (rid)-> "releases/#{rid}/iterations"
      getReleaseIterationStories: ({iteration})-> "iterations/#{iteration}/stories"