define ['data/JSONP'], ({get,serviceurl})->

  login: (user,pass,done)->
    get
      mock: 'data/mock/Auth-login'
      real: serviceurl "auth/login?user=#{user}&pass=#{pass}"
      done

  logout: (done)->
    get
      mock: 'data/mock/Auth-login'
      real: serviceurl 'auth/logout'
      done
