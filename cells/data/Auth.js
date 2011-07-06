define(['data/JSONP', 'Bus'], function(_arg, Bus) {
  var JSONPService, getXPToolBaseUrl, service, user;
  JSONPService = _arg.JSONPService, getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  user = null;
  service = new JSONPService('Auth', {
    baseURL: getXPToolBaseUrl('rest/xoltop/auth/'),
    methods: {
      login: {
        path: function(username, pass, done) {
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
        path: 'logout',
        process: function(result) {
          debugger;          Bus.trigger({
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