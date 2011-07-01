define ['data/JSONP','Bus'], ({get,getXPToolBaseUrl},Bus)->
  user = null

  getUser: -> return user

  login$: (username,pass,done)->
    get
      mock: 'data/mock/Auth-login'
      real: getXPToolBaseUrl "rest/xoltop/auth/login?user=#{username}&pass=#{pass}"
      ({user:u})->
        done user = u
        if user then Bus.trigger type: 'auth.userLoggedIn', user: user

  logout$: (done)->
    user = null
    get
      mock: 'data/mock/Auth-login'
      real: getXPToolBaseUrl "rest/xoltop/auth/logout"
      done
    Bus.trigger type: 'auth.userLoggedOut'
