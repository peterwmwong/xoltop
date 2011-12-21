
define(function() {
  var i, t, _results;
  t = function(n, c) {
    return {
      testname: "test" + n + "_verifyThis",
      issuecount: c
    };
  };
  _results = [];
  for (i = 0; i <= 10; i++) {
    _results.push(t(i, 20 + i));
  }
  return _results;
});
