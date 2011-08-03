var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/InitialsList'], function(S, InitialsList) {
  var updateUser;
  updateUser = function() {
    var u;
    u = S.auth.getUser();
    if (u != null) {
      this.$('.InitialsList').remove();
      return this.$('#username').html(u.loginName.toUpperCase()).after(new InitialsList({
        initials: u && [u.initials] || []
      }).el);
    }
  };
  return {
    init: function() {
      return S.bus.bind('auth.userLoggedIn', __bind(function() {
        return updateUser.call(this);
      }, this));
    },
    'render <span>': function(R) {
      return [
        R('a#username', {
          href: '#'
        }), R('#options-group', R('button#signout-button', 'Sign Out'))
      ];
    },
    bind: {
      afterRender: updateUser,
      'click #signout-button': function() {
        S.auth.logout();
        return this.$el.toggleClass('expanded', false);
      },
      'click #username': function() {
        return this.$el.toggleClass('expanded');
      }
    }
  };
});