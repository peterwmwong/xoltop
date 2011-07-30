var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!./SignedIn'], function(S, SignedIn) {
  var doSubmit;
  return {
    init: function() {
      return S.bus.bind('auth.userLoggedOut', __bind(function() {
        return this.$el.toggleClass('loggedin', false);
      }, this));
    },
    'render <span>': function(R, A) {
      return S.auth.user(__bind(function(user) {
        if (user != null) {
          this.$el.toggleClass('loggedin');
        }
        return A([
          R('#signin-group', R('a#signin-toggle', {
            href: '#'
          }, 'Sign In'), R('#input-group', R('.user', 'User ', R('input#auth-user', {
            type: 'text'
          })), R('.password', 'Pass ', R('input#auth-pass', {
            type: 'password'
          })), R('span#loginFailed', 'Login Failed'), R('button#signin-button', 'Sign in'))), R(SignedIn, {
            user: user
          })
        ]);
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