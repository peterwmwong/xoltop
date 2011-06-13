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
    },
    bind: {
      'selected .DashboardStory': function(_arg) {
        var target;
        target = _arg.target;
        return this.$('.DashboardStory.selected').trigger('deselected');
      }
    }
  };
});