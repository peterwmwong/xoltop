var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService'], function(DashboardService) {
  var O;
  O = function(o) {
    return o;
  };
  return {
    render: function(R, A) {
      var self;
      self = this;
      return DashboardService.getRecentTestResults(this.options.type, __bind(function(_arg) {
        var failures, h, lc, lines, r, results, w, xs, ys, _ref;
        results = _arg.results;
        _ref = [125, 55], w = _ref[0], h = _ref[1];
        r = Raphael(0, 1, w, h);
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
          this.attr({
            fill: '#F00',
            opacity: .2
          });
          this.origSymbolColor = this.symbols[0].attr('fill');
          this.symbols[0].attr({
            fill: '#F00'
          });
        }, function() {
          this.attr({
            opacity: 0
          });
          return this.symbols[0].attr({
            fill: this.origSymbolColor
          });
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