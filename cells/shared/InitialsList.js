
define(['Services'], function(S) {
  return {
    'render <ul>': function(R) {
      var curUserInitials, initials, _ref;
      curUserInitials = (_ref = S.auth.getUser()) != null ? _ref.initials : void 0;
      return [
        (function() {
          var _i, _len, _ref2, _results;
          _ref2 = this.options.initials;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            initials = _ref2[_i];
            _results.push(R('li', {
              "class": curUserInitials === initials && 'currentUser' || ''
            }, initials));
          }
          return _results;
        }).call(this)
      ];
    }
  };
});
