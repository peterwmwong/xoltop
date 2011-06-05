var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define([], (function() {
  var getPropFunc;
  if (typeof $ === "function") {
    $('head').append("<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'/>");
  }
  getPropFunc = function(prop) {
    return function(obj) {
      return obj[prop];
    };
  };
  return function() {
    return {
      init: function() {
        var cmap, col, funcOrProp, k, member, type, v, _base, _i, _len, _name, _ref, _ref2, _ref3;
        this._categoryNames = (function() {
          var _ref, _results;
          _ref = this.options.categories;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            _results.push(k);
          }
          return _results;
        }).call(this);
        this._catToMembers = {};
        _ref = this.options.members;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          ((_ref2 = (_base = this._catToMembers)[_name = this.options.mapMember(member)]) != null ? _ref2 : _base[_name] = []).push(member);
        }
        _ref3 = cmap = this.options.columnMap;
        for (col in _ref3) {
          funcOrProp = _ref3[col];
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
        return "<table><tbody>\n  " + (R(this._categoryNames, __bind(function(cat, gi) {
          var members;
          return R((members = this._catToMembers[cat]).length !== 0 && ("        " + (R(numVisibleGroups++ !== 0 && "          <tr class='categorySpacer'><td colspan='6'> </td></tr>        ")) + "        <tr class='" + (oddEven()) + " " + cat + "'>          <td rowspan='" + members.length + "' class='category " + cat + "'>            " + this.options.categories[cat] + "          </td>          " + (R(members, __bind(function(m, i) {
            var c, f;
            return "            " + (R(i !== 0 && ("<tr class='" + (oddEven()) + " " + cat + "'>"))) + "            <td class='categoryColumnSpacer'>&nbsp;</td>            " + (R((function() {
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
              return "              <td class='column " + c + "'>" + (f(m)) + "</td>            ";
            })) + "        </tr>          ";
          }, this))) + "  "));
        }, this))) + "\n</tbody></table>";
      }
    };
  };
})());