
define(['data/JSONPService'], function(_arg) {
  var JSONPService, getXPToolBaseUrl;
  JSONPService = _arg.JSONPService, getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  return new JSONPService('Metrics', {
    baseURL: getXPToolBaseUrl('rest/testmetrics/'),
    process: function(rs) {
      var m, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rs.length; _i < _len; _i++) {
        m = rs[_i];
        _results.push(m.metrics);
      }
      return _results;
    },
    methods: {
      getReleases: 'releases',
      getReleaseIterations: function(rid) {
        return "releases/" + rid + "/iterations";
      },
      getReleaseIterationStories: function(_arg2) {
        var iteration;
        iteration = _arg2.iteration;
        return "iterations/" + iteration + "/stories";
      }
    }
  });
});
