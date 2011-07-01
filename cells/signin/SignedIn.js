var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'Bus'], function(S, Bus) {
  return {
    init: function() {
      return Bus.bind('auth.userLoggedIn', __bind(function(_arg) {
        var user;
        user = _arg.user;
        return this.$('#username').html(user.loginName);
      }, this));
    },
    'render <span>': function(R) {
      return "<a id='username' href='#'></a>\n<div id='options-group'>\n  <button id='signout-button'>Sign Out</button>\n</div>";
    },
    bind: {
      'click #signout-button': function() {
        S.auth.logout$();
        return this.$el.toggleClass('expanded', false);
      },
      'click #username': function() {
        return this.$el.toggleClass('expanded');
      }
    }
  };
});