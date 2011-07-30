var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services'], function(S) {
  var failColor, getDate, highlightCol, i, mapDate, offsetDayMap, passColor, today, unhighlightCol;
  passColor = '#62872C';
  failColor = '#992626';
  highlightCol = function(col) {
    var colColor, color, _ref;
    _ref = col.values[0] > 0 && ['#F88', '#F00'] || ['#8F8', '#090'], color = _ref[0], colColor = _ref[1];
    col.attr({
      fill: colColor,
      opacity: .15
    });
    return col.symbols.attr({
      stroke: color,
      'stroke-width': 2,
      'stroke-opacity': 1
    });
  };
  offsetDayMap = ['Today', 'Yesterday'].concat((function() {
    var _results;
    _results = [];
    for (i = 2; i < 7; i++) {
      _results.push("" + i + " days ago");
    }
    return _results;
  })(), "a week ago");
  today = new Date();
  mapDate = function(o) {
    return today.getMonth() === o.getMonth() && offsetDayMap[today.getDate() - o.getDate()];
  };
  getDate = function(d) {
    return mapDate(d = new Date(d)) || ("" + (d.getMonth()) + "-" + (d.getDate()));
  };
  unhighlightCol = function(col) {
    var color;
    color = col.values[0] > 0 && failColor || passColor;
    col.attr({
      opacity: 0
    });
    return col.symbols[0].attr({
      fill: color,
      'stroke-opacity': 0
    });
  };
  return {
    render: function(R, A) {
      var $el;
      $el = this.$el;
      return S.dashboard.getRecentTestResults(this.options.type, __bind(function(results) {
        var col, failures, h, i, lastCol, lc, r, urlPrefix, w, _i, _len, _ref, _ref2, _ref3, _results;
        this.results = results;
        _ref = [125, 64], w = _ref[0], h = _ref[1];
        r = Raphael(0, 3, w, h);
        lc = r.g.linechart(0, 0, w, h, [
          (function() {
            _results = [];
            for (var _i = 0, _ref2 = results.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; 0 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this, arguments)
        ], [
          (function() {
            var _j, _len, _results2;
            _results2 = [];
            for (_j = 0, _len = results.length; _j < _len; _j++) {
              failures = results[_j].testResult.failures;
              _results2.push(failures);
            }
            return _results2;
          })()
        ], {
          nostroke: false,
          symbol: "o",
          colors: ['#4A1A1A']
        });
        urlPrefix = this.options.urlPrefix;
        lc.clickColumn(function() {
          return window.open(urlPrefix + results[this.axis].testResult.runid, "_blank");
        });
        lc.hoverColumn.call(lc, function() {
          highlightCol(this);
          if (lastCol !== this) {
            unhighlightCol(lastCol);
          }
          return $el.trigger({
            type: 'resultHovered',
            column: this
          });
        }, function() {
          unhighlightCol(this);
          return $el.trigger({
            type: 'resultUnhovered'
          });
        });
        _ref3 = lc.columns;
        for (i = 0, _len = _ref3.length; i < _len; i++) {
          col = _ref3[i];
          col.symbols[0].attr({
            fill: col.values[0] === 0 ? passColor : failColor
          });
        }
        highlightCol((lastCol = this.lastCol = lc.columns[lc.columns.length - 1]));
        lc.symbols.attr({
          r: 3
        });
        r.canvas["class"] = 'graph';
        return A([R('table', R('tr', R('td', R('.graphContainer', r.canvas)), R("td.labelRow" + (this.lastCol.values[0] && '.fail' || ''), R('.label', this.options.label), R('.count', this.lastCol.values[0]), R('.when'))))]);
      }, this));
    },
    bind: {
      'mouseout': function() {
        return highlightCol(this.lastCol);
      },
      'resultUnhovered': function() {
        this.$('.labelRow').toggleClass('fail', this.lastCol.values[0] > 0);
        this.$('.count').html(this.lastCol.values[0]);
        return this.$('.when').html("");
      },
      'resultHovered': function(ev) {
        this.$('.labelRow').toggleClass('fail', ev.column.values[0] > 0);
        this.$('.count').html(ev.column.values[0]);
        return this.$('.when').html(getDate(this.results[ev.column.axis].testResult.datetime));
      }
    }
  };
});