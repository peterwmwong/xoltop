define(['Services'], function(S) {
  return {
    'render <ul>': function(R, A) {
      var curUserInitials, _ref;
      curUserInitials = (_ref = S.auth.getUser()) != null ? _ref.initials : void 0;
      return R(this.options.initials, function(initials, i) {
        return "<li " + (R(curUserInitials === initials && "class='currentUser'")) + ">" + initials + "</li>";
      });
    }
  };
});