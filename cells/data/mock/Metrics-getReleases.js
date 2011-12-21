
define(function() {
  var metric;
  metric = function(o) {
    return {
      metrics: o
    };
  };
  return [
    metric({
      id: '20',
      name: '9.9',
      ats: 100,
      chumpTasks: 200
    }), metric({
      id: '21',
      name: '9.8',
      ats: 100,
      chumpTasks: 200
    })
  ];
});
