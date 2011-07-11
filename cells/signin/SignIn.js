var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!./SignedIn', 'Bus'], function(S, SignedIn, Bus) {
  var doSubmit;
  return {
    init: function() {
      return Bus.bind('auth.userLoggedOut', __bind(function() {
        return this.$el.toggleClass('loggedin', false);
      }, this));
    },
    'render <span>': function(R, A) {
      return S.auth.user(__bind(function(user) {
        if (user != null) {
          this.$el.toggleClass('loggedin');
        }
        return A("<div id='signin-group'>\n  <a id='signin-toggle' href='#'>Sign in</a>\n  <div id='input-group'>\n    <div>\n      User <input type='text' id='auth-user'></input>\n    </div>\n    <div>\n      Pass <input type='password' id='auth-pass'></input>\n    </div>\n    <span id='loginFailed'>Login Failed</span>\n    <button id='signin-button'>Sign in</button>\n  </div>\n</div>\n" + (R.cell(SignedIn, {
          user: user
        })));
      }, this));
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
        this.$('#loginFailed').toggle(false);
        if (user.length + pass.length > 0) {
          return S.auth.login(user, pass, __bind(function(user) {
            var failed;
            this.$('#signin-button').removeAttr('disabled');
            this.$el.toggleClass('loading', false);
            if (user != null) {
              this.$el.toggleClass('selected', false);
              this.$el.toggleClass('loggedin', true);
            }
            failed = !user;
            this.$('#loginFailed').toggle(failed);
            this.$('#auth-user').toggleClass('invalid', failed);
            return this.$('#auth-pass').toggleClass('invalid', failed);
          }, this));
        }
      },
      'keyup #auth-pass, #auth-user': function(_arg) {
        var which;
        which = _arg.which;
        if (which === 13) {
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