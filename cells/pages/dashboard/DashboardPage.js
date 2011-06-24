var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./DashboardStory', 'cell!./statusshelf/IterationChooser', 'cell!./statusshelf/testresultsgraph/TestResultsGraph'], function(DashboardService, LoadingIndicator, DashboardStory, IterationChooser, TestResultsGraph) {
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
      return DashboardService.getStorySummaries(null, function(_arg) {
        var iterationNo, stories;
        iterationNo = _arg.iterationNo, stories = _arg.stories;
        return A("<div class='stats'>\n  " + (R.cell(IterationChooser, {
          iterationNo: iterationNo
        })) + "\n  " + (R.cell(TestResultsGraph, {
          type: 'ats',
          label: 'AT',
          urlPrefix: DashboardService.getXPToolBaseUrl('xp.failingtestsbypackage.do?runID=')
        })) + "\n  " + (R.cell(TestResultsGraph, {
          type: 'units',
          label: 'UNIT',
          urlPrefix: DashboardService.getXPToolBaseUrl('unittool.failingtestsbysuite.do?testRunID=')
        })) + "\n</div>\n" + (R.cell(LoadingIndicator)) + "\n" + (R(stories, function(story) {
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
      },
      'iterationNoChanged .IterationChooser': function(_arg) {
        var newIterationNo;
        newIterationNo = _arg.newIterationNo;
        this.$('.DashboardStory').remove();
        this.$('.LoadingIndicator').trigger('enable');
        return DashboardService.getStorySummaries(newIterationNo, __bind(function(_arg2) {
          var s, stories, _i, _len, _results;
          stories = _arg2.stories;
          this.$('.DashboardStory').remove();
          this.$('.LoadingIndicator').trigger('disable');
          _results = [];
          for (_i = 0, _len = stories.length; _i < _len; _i++) {
            s = stories[_i];
            _results.push((new DashboardStory({
              model: s
            })).$el.appendTo(this.el));
          }
          return _results;
        }, this));
      }
    }
  };
});