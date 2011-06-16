var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!./DashboardStory'], function(DashboardService, DashboardStory) {
  var CountLabel;
  CountLabel = cell.extend({
    render: function(R, A) {
      return DashboardService.getTestStatus(__bind(function(data) {
        return A("<div class='count'>" + data[this.options.countProp] + "</div>\n<div class='label'>" + this.options.label + "</div>");
      }, this));
    }
  });
  return {
    render: function(R, A) {
      return DashboardService.getStorySummaries(function(sums) {
        return A("<div class='stats'>\n  <div class='iteration'>\n    <div class='iterNum'>314</div>\n    <div class='iterLabel'>ITERATION</div>\n  </div>\n  <div class='failingTests'>\n    <div class='icon'><div>FAILING<div>TESTS</div></div></div>\n    <div class='label'>&nbsp;</div>\n  </div>\n  " + (R.cell(CountLabel, {
          "class": 'ATCount',
          label: 'AT',
          countProp: 'failingATs'
        })) + "\n  " + (R.cell(CountLabel, {
          "class": 'UnitCount',
          label: 'UNIT',
          countProp: 'failingUnits'
        })) + "\n  " + (R.cell(CountLabel, {
          "class": 'SmallCount',
          label: 'SMALL',
          countProp: 'failingSmalls'
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