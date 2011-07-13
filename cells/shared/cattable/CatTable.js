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
        this._numCols = 0;
        _ref2 = cmap = this.options.columnMap;
        for (col in _ref2) {
          funcOrProp = _ref2[col];
          this._numCols++;
          if ((type = typeof funcOrProp) === 'string') {
            cmap[col] = getPropFunc(funcOrProp);
          } else if (type === 'function') {
            cmap[col] = funcOrProp;
          } else {
            this._numCols--;
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
        return "<table><tbody>\n  " + (R(this._categoryNames, __bind(function(cat, gi) {
          var c, members;
          return R((members = this._catToMembers[cat]).length !== 0 && ("        " + (R(numVisibleGroups++ !== 0 && ("          <tr class='categorySpacer'><td colspan='" + this._numCols + "'> </td></tr>        "))) + "        <tr class='" + (oddEven()) + " " + cat + " firstHolder'>          <td rowspan='" + (members.length + 1) + "' class='category " + cat + "'>            " + this.options.categories[cat] + "          </td>          <td class='categoryColumnSpacer'></td>          " + (R((function() {
            var _results;
            _results = [];
            for (c in this.options.columnMap) {
              _results.push(c);
            }
            return _results;
          }).call(this), function() {
            return "            <td class='column'></td>          ";
          })) + "        </tr>        " + (R(members, __bind(function(m, i) {
            var c, f;
            return "          <tr class='" + (oddEven()) + " " + cat + "'>              <td class='categoryColumnSpacer'>&nbsp;</td>              " + (R((function() {
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
              return "                <td class='column " + c + "'>" + (f(m)) + "</td>              ";
            })) + "          </tr>        ";
          }, this))) + "  "));
        }, this))) + "\n</tbody></table>";
      }
    };
  };
})());