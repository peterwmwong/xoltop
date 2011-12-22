
define(['cell!./NodeRow'], function(NodeRow) {
  return {
    render: function(_) {
      var text;
      return [
        this.options.title ? _('#titlebar', this.options.title) : void 0, _('#rows', _('#headerrow', (function() {
          var _i, _len, _ref, _results;
          _ref = this.options.cols;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            text = _ref[_i];
            _results.push(_('.headercol', text));
          }
          return _results;
        }).call(this)), _(NodeRow, {
          "class": 'ROOT',
          model: {
            type: '_',
            expanded: true
          },
          dataProviders: this.options.dataProviders
        }))
      ];
    }
  };
});
