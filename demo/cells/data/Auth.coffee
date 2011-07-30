define [
  'data/JSONP'
  'Bus'
],({JSONPService,getXPToolBaseUrl},Bus)->
  
  user = undefined
  service = new JSONPService 'Auth'
    baseURL: getXPToolBaseUrl 'rest/xoltop/auth/'
    methods:

      user:
        getCached: -> user
        path: "user"
        process: ({user:u})-> user = u or null

      login:
        path: (username,pass)-> "login?user=#{username}&pass=#{pass}"
        process: ({user:u})->
          if user = u then Bus.trigger type: 'auth.userLoggedIn', user: user
          user

      logout:
        path: 'logout'
        process: (result)->
          user = null
          Bus.trigger type: 'auth.userLoggedOut'
          result

  service.getUser = -> return user
  service