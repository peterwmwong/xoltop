
define(function() {
  var metric;
  metric = function(o) {
    return {
      metrics: o
    };
  };
  return [
    metric({
      id: 221,
      name: 221,
      ats: 50,
      chumpTasks: 50
    }), metric({
      id: 222,
      name: 222,
      ats: 50,
      chumpTasks: 50
    })
  ];
});
