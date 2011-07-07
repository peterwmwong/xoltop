var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'Bus', 'cell!shared/InitialsList'], function(S, Bus, InitialsList) {
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
      return Bus.bind('auth.userLoggedIn', __bind(function() {
        return updateUser.call(this);
      }, this));
    },
    'render <span>': function(R) {
      return "<a id='username' href='#'></a>\n<div id='options-group'>\n  <button id='signout-button'>Sign Out</button>\n</div>";
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