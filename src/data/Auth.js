
define(['data/JSONPService', 'Bus'], function(_arg, Bus) {
  var JSONPService, LoginCrossOriginHack, LogoutCrossOriginHack, getXPToolBaseUrl, service, user;
  JSONPService = _arg.JSONPService, getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  LoginCrossOriginHack = function(u, p) {
    try {
      return $('body').append($("<img src='" + (getXPToolBaseUrl('base.login.do')) + "?loginName=" + u + "&password=" + p + "&login=Login' height='0' width='0'/>"));
    } catch (_error) {}
  };
  LogoutCrossOriginHack = function() {
    try {
      return $('body').append($("<img src='" + (getXPToolBaseUrl('base.login.do')) + "?logout=true' height='0' width='0'/>"));
    } catch (_error) {}
  };
  user = void 0;
  service = new JSONPService('Auth', {
    baseURL: getXPToolBaseUrl('rest/xoltop/auth/'),
    methods: {
      user: {
        getCached: function() {
          return user;
        },
        path: "user",
        process: function(_arg2) {
          var u;
          u = _arg2.user;
          return user = u || null;
        }
      },
      login: {
        path: function(username, pass) {
          LoginCrossOriginHack(username, pass);
          return "login?user=" + username + "&pass=" + pass;
        },
        process: function(_arg2) {
          var u;
          u = _arg2.user;
          if (user = u) {
            Bus.trigger({
              type: 'auth.userLoggedIn',
              user: user
            });
          }
          return user;
        }
      },
      logout: {
        path: function() {
          LogoutCrossOriginHack();
          return 'logout';
        },
        process: function(result) {
          user = null;
          Bus.trigger({
            type: 'auth.userLoggedOut'
          });
          return result;
        }
      }
    }
  });
  service.getUser = function() {
    return user;
  };
  return service;
});
