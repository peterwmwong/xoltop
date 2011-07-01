define(['data/JSONP', 'Bus'], function(_arg, Bus) {
  var get, getXPToolBaseUrl, user;
  get = _arg.get, getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  user = null;
  return {
    getUser: function() {
      return user;
    },
    login$: function(username, pass, done) {
      return get({
        mock: 'data/mock/Auth-login',
        real: getXPToolBaseUrl("rest/xoltop/auth/login?user=" + username + "&pass=" + pass)
      }, function(_arg2) {
        var u;
        u = _arg2.user;
        done(user = u);
        if (user) {
          return Bus.trigger({
            type: 'auth.userLoggedIn',
            user: user
          });
        }
      });
    },
    logout$: function(done) {
      user = null;
      get({
        mock: 'data/mock/Auth-login',
        real: getXPToolBaseUrl("rest/xoltop/auth/logout")
      }, done);
      return Bus.trigger({
        type: 'auth.userLoggedOut'
      });
    }
  };
});