var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./DashboardStory', 'cell!./statusshelf/IterationChooser', 'cell!./statusshelf/testresultsgraph/TestResultsGraph'], function(S, LoadingIndicator, DashboardStory, IterationChooser, TestResultsGraph) {
  return {
    render: function(R, A) {
      return S.dashboard.getStorySummaries(null, function(_arg) {
        var iterationNo, stories;
        iterationNo = _arg.iterationNo, stories = _arg.stories;
        return A("<div class='stats'>\n  " + (R.cell(IterationChooser, {
          iterationNo: iterationNo
        })) + "\n  " + (R.cell(TestResultsGraph, {
          type: 'ats',
          label: 'AT',
          urlPrefix: S.getXPToolBaseUrl('xp.failingtestsbypackage.do?runID=')
        })) + "\n  " + (R.cell(TestResultsGraph, {
          type: 'units',
          label: 'UNIT',
          urlPrefix: S.getXPToolBaseUrl('unittool.failingtestsbysuite.do?testRunID=')
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
        return S.dashboard.getStorySummaries(newIterationNo, __bind(function(_arg2) {
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