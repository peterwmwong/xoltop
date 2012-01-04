
define(function() {
  var metric;
  metric = function(o) {
    return {
      metrics: o
    };
  };
  return [
    metric({
      id: 56265,
      name: 'DCPI Title Details',
      ats: 15,
      chumpTasks: 35
    }), metric({
      id: 462,
      name: 'RPS Label',
      ats: 35,
      chumpTasks: 15
    })
  ];
});
