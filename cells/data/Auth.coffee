define ['data/JSONP','Bus'],({JSONPService,getXPToolBaseUrl},Bus)->
  user = null
  service = new JSONPService 'Auth'
    baseURL: getXPToolBaseUrl 'rest/xoltop/auth/'
    methods:

      login:
        path: (username,pass,done)-> "login?user=#{username}&pass=#{pass}"
        process: ({user:u})->
          if user = u then Bus.trigger type: 'auth.userLoggedIn', user: user
          user

      logout:
        path: 'logout'
        process: (result)->
          debugger
          Bus.trigger type: 'auth.userLoggedOut'
          result

  service.getUser = -> return user
  service