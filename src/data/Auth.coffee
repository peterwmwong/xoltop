define [
  'data/JSONPService'
  'Bus'
],({JSONPService,getXPToolBaseUrl},Bus)->

  LoginCrossOriginHack = (u,p)->
    try $('body').append $ "<img src='#{getXPToolBaseUrl 'base.login.do'}?loginName=#{u}&password=#{p}&login=Login' height='0' width='0'/>"

  LogoutCrossOriginHack = ->
    try $('body').append $ "<img src='#{getXPToolBaseUrl 'base.login.do'}?logout=true' height='0' width='0'/>"
  
  user = undefined
  service = new JSONPService 'Auth'
    baseURL: getXPToolBaseUrl 'rest/xoltop/auth/'
    methods:

      user:
        getCached: -> user
        path: "user"
        process: ({user:u})-> user = u or null

      login:
        path: (username,pass)->
          LoginCrossOriginHack username, pass
          "login?user=#{username}&pass=#{pass}"
        process: ({user:u})->
          if user = u then Bus.trigger type: 'auth.userLoggedIn', user: user
          user

      logout:
        path: ->
          LogoutCrossOriginHack()
          'logout'
        process: (result)->
          user = null
          Bus.trigger type: 'auth.userLoggedOut'
          result

  service.getUser = -> user
  service