
define(['Services', 'cell!./SignedIn'], function(S, SignedIn) {
  var doSubmit;
  return {
    tag: '<span>',
    render: function(_) {
      var _this = this;
      S.bus.bind('auth.userLoggedOut', function() {
        return _this.$el.toggleClass('loggedin', false);
      });
      return S.auth.user(function(user) {
        if (user != null) _this.$el.toggleClass('loggedin');
        return _this.$el.append([
          _('#signin-group', _('a#signin-toggle', {
            href: '#'
          }, 'Sign In'), _('#input-group', _('.user', 'User ', _('input#auth-user', {
            type: 'text'
          })), _('.password', 'Pass ', _('input#auth-pass', {
            type: 'password'
          })), _('span#loginFailed', 'Login Failed'), _('button#signin-button', 'Sign in'))), _(SignedIn, {
            user: user
          })
        ]);
      });
    },
    on: {
      'click #signin-button': doSubmit = function() {
        var pass, user,
          _this = this;
        user = this.$('#auth-user').val();
        pass = this.$('#auth-pass').val();
        this.$('#auth-user').toggleClass('invalid', user.length === 0);
        this.$('#auth-pass').toggleClass('invalid', pass.length === 0);
        this.$('#signin-button').attr('disabled', 'true');
        this.$el.toggleClass('loading', true);
        this.$('#loginFailed').toggle(false);
        if (user.length + pass.length > 0) {
          return S.auth.login(user, pass, function(user) {
            var failed;
            _this.$('#signin-button').removeAttr('disabled');
            _this.$el.toggleClass('loading', false);
            if (user != null) {
              _this.$el.toggleClass('selected', false);
              _this.$el.toggleClass('loggedin', true);
            }
            failed = !user;
            _this.$('#loginFailed').toggle(failed);
            _this.$('#auth-user').toggleClass('invalid', failed);
            return _this.$('#auth-pass').toggleClass('invalid', failed);
          });
        }
      },
      'keyup #auth-pass, #auth-user': function(_arg) {
        var which;
        which = _arg.which;
        if (which === 13) return doSubmit.call(this);
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
