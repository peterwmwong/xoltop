define([], function() {
  var i;
  return {
    results: (function() {
      var _results;
      _results = [];
      for (i = 0; i < 10; i++) {
        _results.push((function() {
          return {
            datetime: 'Sun Jun 1' + i + ' 2011 19:35:03 GMT-0500 (CDT)',
            failures: Math.random() * 50 + 100,
            runid: 1230 + i
          };
        })());
      }
      return _results;
    })()
  };
});