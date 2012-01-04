define ['shared/LocationSearch'], (LocationSearch)->
  idFunc = (o)->o
  jsonpID = 0
  jsonp = (options)->
    jsonpString = "__jsonp#{++jsonpID}"
    window[jsonpString] = (j)->
      options.success j
      window[jsonpString] = undefined
      $('#'+jsonpString).remove()

    options.callback ?= 'callback'
    s = document.createElement 'script'
    s.id = jsonpString
    s.setAttribute 'type', 'text/javascript'
    s.setAttribute 'src', "#{options.url}#{options.url.indexOf('?') == -1 and '?' or '&'}#{options.callback}=#{jsonpString}"
    $('head').append s

  get =
    if LocationSearch.usemockdata
      ({mock},done)-> setTimeout (-> require [mock], done), 500
    else
      ({real},done)->
        jsonp
          callback: 'jsonp'
          url: real
          success: done or ->
   
  getXPToolBaseUrl: (relPath)-> "http://172.16.0.230/xptool/#{relPath}"

  JSONPService: class
    constructor: (serviceName,{baseURL,process,methods})->
      process ?= idFunc

      for name,pathFunc of methods then do(name,pathFunc)=>
        methodProcess = process
        cacheFunc = idFunc

        if (t = typeof pathFunc) is 'object' and t isnt 'function'
          methodProcess = pathFunc.process if pathFunc.process?
          pathFunc = pathFunc.path
          cacheFunc = pathFunc.getCache if pathFunc.getCache?

        if typeof pathFunc is 'string'
          pathFunc = do(pathFunc)-> -> pathFunc

        @[name] = (args...,done = idFunc)=>
          if (cacheValue = cacheFunc()) isnt undefined
            done cacheValue
          else
            get
              mock: "data/mock/#{serviceName}-#{name}"
              real: baseURL + pathFunc args...
              (rs)-> done methodProcess rs
          return
