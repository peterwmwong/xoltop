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
      var _ref, _ref2;
      return "<a id='username' href='#'><span class='initialBadge'>" + (R((_ref = this.options.user) != null ? _ref.initials : void 0)) + "</span>" + (R((_ref2 = this.options.user) != null ? _ref2.loginName : void 0)) + "</a>\n<div id='options-group'>\n  <button id='signout-button'>Sign Out</button>\n</div>";
    },
    bind: {
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