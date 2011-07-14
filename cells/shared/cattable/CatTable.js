var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
      render: function(R) {
        var numVisibleGroups, oddEven;
        numVisibleGroups = 0;
        oddEven = (function() {
          var isEven;
          isEven = false;
          return function() {
            return (isEven = !isEven) && 'even' || 'odd';
          };
        })();
        return "" + (R(this._categoryNames, __bind(function(cat, gi) {
          return "  <div class='category " + cat + "'>    <div class='header'>" + this.options.categories[cat] + "</div>    <div class='members'>    " + (R(this._catToMembers[cat], __bind(function(member) {
            var c, f;
            return "        <div class='member " + (oddEven()) + "'>        " + (R((function() {
              var _ref, _results;
              _ref = this.options.columnMap;
              _results = [];
              for (c in _ref) {
                f = _ref[c];
                _results.push({
                  c: c,
                  f: f
                });
              }
              return _results;
            }).call(this), function(_arg) {
              var c, f;
              c = _arg.c, f = _arg.f;
              return "          <div class='column " + c + "'>" + (f(member)) + "</div>        ";
            })) + "        </div>    ";
          }, this))) + "    </div>  </div>";
        }, this)));
      }
    };
  };
})());