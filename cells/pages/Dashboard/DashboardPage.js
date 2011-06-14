define(['data/DashboardService', 'cell!./DashboardStory'], function(DashboardService, DashboardStory) {
  return {
    render: function(R, A) {
      return DashboardService.getStorySummaries(function(sums) {
        return A("<div class='stats'>\n  <div class='iteration'>\n    <div class='iterNum'>314</div>\n    <div class='iterLabel'>ITERATION</div>\n  </div>\n  <div class='failingTests'>\n    <div class='icon'>FAILING</div>\n    <div class='label'>&nbsp;</div>\n  </div>\n  <div class='ATCount'>\n    <div class='count'>180</div>\n    <div class='label'>AT</div>\n  </div>\n  <div class='UnitCount'>\n    <div class='count'>50</div>\n    <div class='label'>UNIT</div>\n  </div>\n  <div class='SmallCount'>\n    <div class='count allPassing'>0</div>\n    <div class='label'>SMALL</div>\n  </div>\n</div>\n" + (R(sums, function(story) {
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