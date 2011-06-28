define(['data/JSONP'], function(_arg) {
  var get, serviceurl;
  get = _arg.get, serviceurl = _arg.serviceurl;
  return {
    login: function(user, pass, done) {
      return get({
        mock: 'data/mock/Auth-login',
        real: serviceurl("auth/login?user=" + user + "&pass=" + pass)
      }, done);
    },
    logout: function(done) {
      return get({
        mock: 'data/mock/Auth-login',
        real: serviceurl('auth/logout')
      }, done);
    }
  };
});