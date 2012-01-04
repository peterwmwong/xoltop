
define([], (function() {
  var getPropFunc;
  getPropFunc = function(prop) {
    return function(obj) {
      return obj[prop];
    };
  };
  return function() {
    return {
      init: function() {
        var cmap, col, funcOrProp, k, member, type, v, _i, _len, _ref, _ref2;
        this._catToMembers = {};
        this._categoryNames = (function() {
          var _ref, _results;
          _ref = this.options.categories;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            this._catToMembers[k] = [];
            _results.push(k);
          }
          return _results;
        }).call(this);
        _ref = this.options.members;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          this._catToMembers[this.options.mapMember(member)].push(member);
        }
        _ref2 = cmap = this.options.columnMap;
        for (col in _ref2) {
          funcOrProp = _ref2[col];
          if ((type = typeof funcOrProp) === 'string') {
            cmap[col] = getPropFunc(funcOrProp);
          } else if (type === 'function') {
            cmap[col] = funcOrProp;
          } else {
            delete cmap[col];
          }
        }
      },
      render: function(_) {
        var c, cat, f, gi, isEven, member, numVisibleGroups, oddEven, _len, _ref, _results;
        numVisibleGroups = 0;
        isEven = false;
        oddEven = function() {
          return (isEven = !isEven) && 'even' || 'odd';
        };
        _ref = this._categoryNames;
        _results = [];
        for (gi = 0, _len = _ref.length; gi < _len; gi++) {
          cat = _ref[gi];
          if (this._catToMembers[cat].length > 0) {
            _results.push(_(".category." + cat, _('.header', this.options.categories[cat]), _('.members', (function() {
              var _i, _len2, _ref2, _results2;
              _ref2 = this._catToMembers[cat];
              _results2 = [];
              for (_i = 0, _len2 = _ref2.length; _i < _len2; _i++) {
                member = _ref2[_i];
                _results2.push(_(".member." + (oddEven()), (function() {
                  var _ref3, _results3;
                  _ref3 = this.options.columnMap;
                  _results3 = [];
                  for (c in _ref3) {
                    f = _ref3[c];
                    _results3.push(_(".column." + c, f(member)));
                  }
                  return _results3;
                }).call(this)));
              }
              return _results2;
            }).call(this))));
          }
        }
        return _results;
      }
    };
  };
})());
