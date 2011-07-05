define ->
  jsonpID = 0
  jsonp = (options)->
    jsonpString = '__jsonp' + ++jsonpID
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
    if window.xoltop?.services?.useMockData
      ({mock},done)-> setTimeout (-> require [mock], done), 500
    else
      ({real},done)->
        jsonp
          callback: 'jsonp'
          url: real
          success: done or ->
 
  getXPToolBaseUrl: getXPToolBaseUrl = (relPath)-> "http://172.16.19.63:69/xptool/#{relPath}"
  #getXPToolBaseUrl: getXPToolBaseUrl = (relPath)-> "http://172.16.0.230/xptool/#{relPath}"

  JSONPService: class
    constructor: (serviceName,{baseURL,process,methods})->
      process ?= (rs)->rs

      for name,pathFunc of methods then do(name,pathFunc)=>
        methodProcess = process

        if (t = typeof pathFunc) == 'object' and t != 'function'
          methodProcess = pathFunc.process if pathFunc.process?
          pathFunc = pathFunc.path

        if typeof pathFunc == 'string' then do->
          p = pathFunc
          pathFunc = -> p

        @[name] = (args...,done)->
          get
            mock: "data/mock/#{serviceName}-#{name}"
            real: baseURL + pathFunc args...
            (rs)->
              rs = methodProcess rs
              done? rs
          return
        
        
