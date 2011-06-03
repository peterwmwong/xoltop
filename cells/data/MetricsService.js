define(['data/JSONP'], function(jsonp) {
  var get, url;
  url = 'http://localhost:6969/xptool/rest/testmetrics/';
  get = jsonp.makeget(url, {
    callback: 'callback',
    process: function(rs) {
      var m, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rs.length; _i < _len; _i++) {
        m = rs[_i];
        _results.push(m.metrics);
      }
      return _results;
    }
  });
  return {
    getReleases: get('releases'),
    getReleaseIterations: get(function(releaseid) {
      return 'releases/' + releaseid + '/iterations';
    }),
    getReleaseChumps: get(function(releaseid) {
      return 'releases/' + releaseid + '/chumps';
    }),
    getReleaseIterationStories: get(function(releaseIterationIds) {
      return 'iterations/' + releaseIterationIds.iteration + '/stories';
    }),
    getReleaseChumpStories: get(function(releaseChumpIds) {
      return 'releases/' + releaseChumpIds.release + '/chumps/' + releaseChumpIds.chump + '/stories';
    })
  };
});