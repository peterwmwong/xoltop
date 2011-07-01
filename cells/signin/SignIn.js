var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!./SignedIn', 'Bus'], function(S, SignedIn, Bus) {
  var doSubmit;
  return {
    init: function() {
      return Bus.bind('auth.userLoggedOut', __bind(function() {
        return this.$el.toggleClass('loggedin', false);
      }, this));
    },
    'render <span>': function(R) {
      return "<div id='signin-group'>\n  <a id='signin-toggle' href='#'>Sign in</a>\n  <div id='input-group'>\n    <div>\n      User <input type='text' id='auth-user'></input>\n    </div>\n    <div>\n      Pass <input type='password' id='auth-pass'></input>\n    </div>\n    <button id='signin-button'>Sign in</button>\n  </div>\n</div>\n" + (R.cell(SignedIn));
    },
    bind: {
      'click #signin-button': doSubmit = function() {
        var pass, user;
        user = this.$('#auth-user').val();
        pass = this.$('#auth-pass').val();
        this.$('#auth-user').toggleClass('invalid', user.length === 0);
        this.$('#auth-pass').toggleClass('invalid', pass.length === 0);
        this.$('#signin-button').attr('disabled', 'true');
        this.$el.toggleClass('loading', true);
        if (user.length + pass.length > 0) {
          return S.auth.login$(user, pass, __bind(function(user) {
            this.$('#signin-button').removeAttr('disabled');
            this.$el.toggleClass('loading', false);
            if (user != null) {
              this.$el.toggleClass('selected', false);
              return this.$el.toggleClass('loggedin', true);
            }
          }, this));
        }
      },
      'keypress #auth-pass, #auth-user': function(_arg) {
        var charCode;
        charCode = _arg.charCode;
        if (charCode === 13) {
          return doSubmit.call(this);
        }
      },
      'click #signin-toggle': function() {
        this.$el.toggleClass('selected');
        if (this.$el.hasClass('selected')) {
          this.$('#auth-user, #auth-pass').val('');
          return this.$('#auth-user').focus();
        }
      }
    }
  };
});