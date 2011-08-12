var __indexOf = Array.prototype.indexOf || function(item) {
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
  render: function(_) {
    var count, type;
    return [
      _('.triangle'), _('.label', {
        href: '#'
      }, this.options.label), _('.counts', (function() {
        var _ref, _results;
        _ref = this.options.counts;
        _results = [];
        for (type in _ref) {
          count = _ref[type];
          if (count > 0 || __indexOf.call(this.options.showIfZero, type) >= 0) {
            _results.push(_("." + type + ".count", count));
          }
        }
        return _results;
      }).call(this))
    ];
  }
});