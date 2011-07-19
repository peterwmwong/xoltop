var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
define({
  init: function() {
    var _base, _ref;
    return (_ref = (_base = this.options).showIfZero) != null ? _ref : _base.showIfZero = [];
  },
  render: function(R) {
    var count, type;
    return [
      R('.triangle'), R('.label', {
        href: '#'
      }, __bind(function() {
        return this.options.label;
      }, this)()), R('.counts', (function() {
        var _ref, _results;
        _ref = this.options.counts;
        _results = [];
        for (type in _ref) {
          count = _ref[type];
          if (count > 0 || __indexOf.call(this.options.showIfZero, type) >= 0) {
            _results.push(R("." + type + ".count", count));
          }
        }
        return _results;
      }).call(this))
    ];
  }
});