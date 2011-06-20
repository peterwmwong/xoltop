var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!./DashboardStory', 'cell!./statusshelf/testresultsgraph/TestResultsGraph'], function(DashboardService, DashboardStory, TestResultsGraph) {
  var CountLabel;
  CountLabel = cell.extend({
    render: function(R, A) {
      return DashboardService.getTestStatus(__bind(function(data) {
        var count;
        return A("<div class='count " + (R(!(count = data[this.options.countProp]) && "passing")) + "'>" + count + "</div>\n<div class='label'>" + this.options.label + "</div>");
      }, this));
    }
  });
  return {
    render: function(R, A) {
      return DashboardService.getStorySummaries(function(sums) {
        return A("<div class='stats'>\n  <div class='iteration'>\n    <div class='iterNum'>314</div>\n    <div class='iterLabel'>ITERATION</div>\n  </div>\n  " + (R.cell(TestResultsGraph, {
          type: 'ats',
          label: 'AT'
        })) + "\n  " + (R.cell(TestResultsGraph, {
          type: 'units',
          label: 'UNIT'
        })) + "\n</div>\n" + (R(sums, function(story) {
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