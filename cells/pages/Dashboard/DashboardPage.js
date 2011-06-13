define(['data/DashboardService', 'cell!./DashboardStory'], function(DashboardService, DashboardStory) {
  return {
    render: function(R, A) {
      return DashboardService.getStorySummaries(function(sums) {
        return A("<div class='stats'>\n  <div class='iteration'>\n    <div class='iterNum'>314</div>\n    <div class='iterLabel'>ITERATION</div>\n  </div>\n  <div class='failingTests'>\n    <div class='iconLabel'>\n      <div class='icon'>x</div>\n      <div class='label'>FAILING</div>\n    </div>\n  </div>\n</div>\n" + (R(sums, function(story) {
          return R.cell(DashboardStory, {
            model: story
          });
        })));
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