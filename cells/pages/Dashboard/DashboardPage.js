define(['data/DashboardService', 'cell!./DashboardStory'], function(DashboardService, DashboardStory) {
  return {
    render: function(R, A) {
      return DashboardService.getStorySummaries(function(sums) {
        return A(R(sums, function(story) {
          return R.cell(DashboardStory, {
            model: story
          });
        }));
      });
    }
  };
});