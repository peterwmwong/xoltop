var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService'], function(DashboardService) {
  var O;
  O = function(o) {
    return o;
  };
  return {
    render: function(R, A) {
      return DashboardService.getRecentTestResults(this.options.type, __bind(function(_arg) {
        var failures, h, lc, lines, r, results, w, xs, ys, _ref;
        results = _arg.results;
        _ref = [125, 55], w = _ref[0], h = _ref[1];
        r = Raphael(0, 0, w, h);
        xs = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
        ys = [
          (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = results.length; _i < _len; _i++) {
              failures = results[_i].failures;
              _results.push(failures);
            }
            return _results;
          })()
        ];
        lc = r.g.linechart(0, 0, w, h, xs, ys, {
          nostroke: false,
          symbol: "o"
        });
        lines = lc.hoverColumn.call(lc, function() {
          var i, ii, tag, _ref2;
          this.tags = r.set();
          _ref2 = [-1, this.y.length], i = _ref2[0], ii = _ref2[1];
          while (++i < ii) {
            (tag = r.g.tag(this.x, this.y[i], this.values[i], 160, 10)).insertBefore(this).attr([
              O({
                fill: "#FFF"
              }), O({
                fill: this.symbols[i].attr('fill')
              })
            ]);
            this.tags.push(tag);
          }
        }, function() {
          return this.tags && this.tags.remove();
        });
        lines.symbols.attr({
          r: 3
        });
        r.canvas["class"] = 'graph';
        return A("" + (R($("<div class='graphContainer'></div>").append(r.canvas)[0])) + "\n<div class='label'>" + this.options.label + "</div>");
      }, this));
    }
  };
});