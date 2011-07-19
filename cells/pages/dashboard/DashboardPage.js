var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
define(['Services', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./DashboardStory', 'cell!./statusshelf/IterationChooser', 'cell!./statusshelf/testresultsgraph/TestResultsGraph', 'cell!shared/InitialsList'], function(S, LoadingIndicator, DashboardStory, IterationChooser, TestResultsGraph, InitialsList) {
  return {
    init: function() {
      var rerender;
      this.iterationNo = null;
      return S.bus.bind({
        'auth.userLoggedIn': rerender = __bind(function() {
          return S.dashboard.getStorySummaries(this.iterationNo, __bind(function(_arg) {
            var iterationNo, stories;
            iterationNo = _arg.iterationNo, stories = _arg.stories;
            return this.renderStories(stories);
          }, this));
        }, this),
        'auth.userLoggedOut': rerender
      });
    },
    renderStories: function(stories) {
      var mystories, s, user, _i, _len, _ref, _results;
      user = S.auth.getUser();
      this.$('.DashboardStory').remove();
      mystories = (function() {
        var _i, _len, _ref, _ref2, _results;
        if (user != null) {
          _results = [];
          for (_i = 0, _len = stories.length; _i < _len; _i++) {
            s = stories[_i];
            if (((s.devs != null) && (_ref = user.initials, __indexOf.call(s.devs, _ref) >= 0)) || ((s.testers != null) && (_ref2 = user.initials, __indexOf.call(s.testers, _ref2) >= 0))) {
              this.$el.append((new DashboardStory({
                model: s
              })).$el);
              _results.push(s.storynum);
            }
          }
          return _results;
        } else {
          return [];
        }
      }).call(this);
      if (mystories.length > 0) {
        this.$('.myStoryDivider .InitialsList').remove();
        this.$('.myStoryDivider > .leftTri').after(new InitialsList({
          initials: user && [user.initials] || []
        }).el);
        this.$('.myStoryDivider').toggle(true);
        this.$el.append(this.$('.myStoryDivider'));
      } else {
        this.$('.myStoryDivider').toggle(false);
      }
      _results = [];
      for (_i = 0, _len = stories.length; _i < _len; _i++) {
        s = stories[_i];
        if (_ref = s.storynum, __indexOf.call(mystories, _ref) < 0) {
          _results.push(this.$el.append((new DashboardStory({
            model: s
          })).$el));
        }
      }
      return _results;
    },
    render: function(R, A) {
      return S.auth.user(__bind(function(user) {
        return S.dashboard.getStorySummaries(null, __bind(function(_arg) {
          var iterationNo, stories;
          iterationNo = _arg.iterationNo, stories = _arg.stories;
          setTimeout((__bind(function() {
            return this.renderStories(stories);
          }, this)), 0);
          return A([
            R('.myStoryDivider', R('span.leftTri'), 'STORIES'), R('.stats', R(IterationChooser, {
              iterationNo: iterationNo
            }), R(TestResultsGraph, {
              type: 'ats',
              label: 'AT',
              urlPrefix: S.getXPToolBaseUrl('xp.failingtestsbypackage.do?runID=')
            }), R(TestResultsGraph, {
              type: 'units',
              label: 'UNIT',
              urlPrefix: S.getXPToolBaseUrl('unittool.failingtestsbysuite.do?testRunID=')
            })), R(LoadingIndicator)
          ]);
        }, this));
      }, this));
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
        this.iterationNo = newIterationNo;
        this.$('.DashboardStory').remove();
        this.$('.LoadingIndicator').trigger('enable');
        return S.dashboard.getStorySummaries(this.iterationNo, __bind(function(_arg2) {
          var stories;
          stories = _arg2.stories;
          this.$('.LoadingIndicator').trigger('disable');
          return this.renderStories(stories);
        }, this));
      }
    }
  };
});