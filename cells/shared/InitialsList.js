
define(['Services'], function(S) {
  return {
    tag: '<ul>',
    render: function(_) {
      var initials, _i, _len, _ref, _ref2, _results;
      _ref = this.options.initials;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        initials = _ref[_i];
        _results.push(_("<li class='" + (((_ref2 = S.auth.getUser()) != null ? _ref2.initials : void 0) === initials && 'currentUser' || '') + "'>", initials));
      }
      return _results;
    }
  };
});
