define(['cell!./NodeRow'], function(NodeRow) {
  return {
    render: function(R) {
      var text;
      return [
        this.options.title ? R('#titlebar', this.options.title) : void 0, R('#rows', R('#headerrow', (function() {
          var _i, _len, _ref, _results;
          _ref = this.options.cols;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            text = _ref[_i];
            _results.push(R('.headercol', text));
          }
          return _results;
        }).call(this)), R(NodeRow, {
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