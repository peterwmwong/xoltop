
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
    tag: 'span',
    init: function() {
      var _this = this;
      return S.bus.bind('auth.userLoggedIn', function() {
        return updateUser.call(_this);
      });
    },
    render: function(_) {
      return [
        _('a#username', {
          href: '#'
        }), _('#options-group', _('button#signout-button', 'Sign Out'))
      ];
    },
    afterRender: updateUser,
    on: {
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
