
define([], function() {
  var i, _results;
  _results = [];
  for (i = 0; i < 10; i++) {
    _results.push((function() {
      return {
        testResult: {
          datetime: 'Sun Jun 2' + i + ' 2011 19:35:03 GMT-0500 (CDT)',
          failures: (i + 1) % 3 ? Math.floor(Math.random() * 50 + 100) : 0,
          runid: 1230 + i
        }
      };
    })());
  }
  return _results;
});
