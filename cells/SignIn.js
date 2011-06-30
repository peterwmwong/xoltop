define(['Services'], function(S) {
  var doSubmit;
  return {
    'render <span>': function(R) {
      return "<a class='signin' href='#'>Sign in</a>\n<div id='auth-login-panel'>\n  <div>\n    User <input type='text' id='auth-user'></input>\n  </div>\n  <div>\n    Pass <input type='password' id='auth-pass'></input>\n  </div>\n  <button id='auth-button'>Sign in</button>\n</div>";
    },
    bind: {
      'click #auth-button': doSubmit = function() {
        var pass, user;
        user = this.$('#auth-user').val();
        pass = this.$('#auth-pass').val();
        this.$('#auth-user').toggleClass('invalid', user.length === 0);
        this.$('#auth-pass').toggleClass('invalid', pass.length === 0);
        if (user.length + pass.length > 0) {
          return S.auth.login(user, pass, function(result) {});
        }
      },
      'keypress #auth-pass, #auth-user': function(_arg) {
        var charCode;
        charCode = _arg.charCode;
        if (charCode === 13) {
          return doSubmit.call(this);
        }
      },
      'click .signin': function() {
        this.$el.toggleClass('selected');
        if (this.$el.hasClass('selected')) {
          this.$('#auth-user, #auth-pass').val('');
          return this.$('#auth-user').focus();
        }
      }
    }
  };
});