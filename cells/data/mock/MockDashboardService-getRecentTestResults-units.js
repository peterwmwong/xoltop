define([], function() {
  var i, _results;
  _results = [];
  for (i = 0; i < 10; i++) {
    _results.push((function() {
      return {
        testResult: {
          datetime: 'Sun Jun 1' + i + ' 2011 19:35:03 GMT-0500 (CDT)',
          failures: Math.floor(Math.random() * 10 + 50),
          runid: 1230 + i
        }
      };
    })());
  }
  return _results;
});