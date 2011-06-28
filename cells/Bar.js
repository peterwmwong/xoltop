var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services'], function(S) {
  return {
    render: function(R) {
      return "<span id='xoltop'>XOLTOP</span>\n" + (R(this.options.items, __bind(function(item, i) {
        return "  <span class='navItemContainer'>    <a href='#'       class='navItem " + (R(i === 0 && 'selected')) + "'       data-item='" + item + "'>" + (item.toUpperCase()) + "</a>  </span>";
      }, this))) + "\n<span id='auth'>\n  <a href='#'>Sign in</a>\n  <div id='auth-login-panel'>\n    <div>\n      User <input type='text' id='auth-user'></input>\n    </div>\n    <div>\n      Pass <input type='password' id='auth-pass'></input>\n    </div>\n    <button id='auth-button'>Sign in</button>\n  </div>\n</span>";
    },
    bind: (function() {
      var doSubmit;
      doSubmit = function() {
        var pass, user;
        user = this.$('#auth-user').val();
        pass = this.$('#auth-pass').val();
        if (user.length === 0) {
          this.$('#auth-user').toggleClass('invalid', true);
        }
        if (pass.length === 0) {
          this.$('#auth-pass').toggleClass('invalid', true);
        }
        if (user.length + pass.length > 0) {
          return S.auth.login(user, pass, function(result) {});
        }
      };
      return {
        'keypress #auth-pass, #auth-user': function(_arg) {
          var charCode;
          charCode = _arg.charCode;
          if (charCode === 13) {
            return doSubmit.call(this);
          }
        },
        'click #auth-button': doSubmit,
        'hover #auth': function() {
          return this.$('#auth-user').focus();
        },
        'click .navItem': function(ev) {
          var target;
          this.$('.navItem.selected').removeClass('selected');
          (target = $(ev.target)).addClass('selected');
          return $(this.el).trigger('selectedItemChanged', {
            item: $(target).attr('data-item')
          });
        }
      };
    })()
  };
});