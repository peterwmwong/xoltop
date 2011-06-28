define(['data/JSONP'], function(_arg) {
  var get, serviceurl;
  get = _arg.get, serviceurl = _arg.serviceurl;
  return {
    getCurrentIterationNumber: function(done) {
      return get({
        mock: 'data/mock/MockDashboardService-getCurrentIterationNumber',
        real: serviceurl("/iteration/current")
      }, function(_arg2) {
        var iterationNo;
        iterationNo = _arg2.iterationInfo.iterationNo;
        return done(iterationNo);
      });
    },
    getIterationTestStatus: function(done) {
      return get({
        mock: 'data/mock/MockDashboardService-getIterationTestStatus',
        real: serviceurl("iteration/tests")
      }, function(_arg2) {
        var test;
        test = _arg2.test;
        return done(test);
      });
    },
    getRecentTestResults: function(type, done) {
      if (type === 'ats' || type === 'units') {
        return get({
          mock: "data/mock/MockDashboardService-getRecentTestResults-" + type,
          real: serviceurl("tests/" + type + "?recent=10")
        }, done);
      } else if (type === 'smalls') {
        return get({
          mock: 'data/mock/MockDashboardService-getRecentTestResults-smalls',
          real: "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json"
        }, done);
      }
    },
    getStoryCodeTasksDetails: function(storynum, done) {
      return get({
        mock: 'data/mock/MockDashboardService-getStoryCodeTasksDetail',
        real: serviceurl("iteration/stories/" + storynum + "/codeTasks")
      }, done);
    },
    getStoryTasksDetails: function(storynum, done) {
      return get({
        mock: 'data/mock/MockDashboardService-getStoryTasksDetail',
        real: serviceurl("iteration/stories/" + storynum + "/tasks")
      }, done);
    },
    getStorySummaries: (function() {
      var getStatus, storyRegex;
      storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/;
      getStatus = function(_arg2) {
        var ats, codeCompletePct, tasks;
        codeCompletePct = _arg2.codeCompletePct, ats = _arg2.ats, tasks = _arg2.tasks;
        if (codeCompletePct < 100 || ats.total === 0) {
          return 0;
        } else if (ats.failing + tasks.needsAttn) {
          return 0;
        } else if (ats.unwritten + tasks.retest) {
          return 1;
        } else {
          return 2;
        }
      };
      return function(iterNo, done) {
        return get({
          mock: 'data/mock/MockDashboardService-getStorySummaries',
          real: serviceurl("iteration/" + ((iterNo != null) && ("" + iterNo + "/") || "") + "stories/")
        }, function(_arg2) {
          var iterationNo, stories, _ref;
          _ref = _arg2.iterationStories, iterationNo = _ref.iterationNo, stories = _ref.stories;
          stories = (function() {
            var devs, match, s, story, testers, _i, _len, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
            _ref2 = stories.sort(function(_arg3, _arg4) {
              var a, b;
              a = _arg3.num;
              b = _arg4.num;
              return a - b;
            });
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              s = _ref2[_i];
              story = {
                codeCompletePct: s.codeCompletePct,
                codeTasksIncomplete: s.codeTasksIncomplete,
                type: 'story',
                ats: {
                  failing: s.failingATs,
                  unwritten: s.unwrittenATs,
                  needsAttn: s.needsAttentionATs,
                  total: s.failingATs + s.passingATs + s.unwrittenATs
                },
                tasks: {
                  retest: s.chumpTaskRetest,
                  needsAttn: s.chumpTaskNA,
                  total: s.chumpTaskComplete
                }
              };
              if (match = storyRegex.exec(s.description + ' ' + s.chumps)) {
                _ref4 = match[5] && ((_ref3 = match[5]) != null ? _ref3.split(' - ') : void 0) || [], devs = _ref4[0], testers = _ref4[1];
                story.storynum = s.num;
                story.name = match[3];
                story.testers = testers != null ? testers.split('/') : void 0;
                story.devs = devs != null ? devs.split('/') : void 0;
                story.tags = (_ref5 = match[1]) != null ? (_ref6 = _ref5.split(' - ')) != null ? _ref6.slice(0, -1) : void 0 : void 0;
              }
              _results.push(story);
            }
            return _results;
          })();
          stories.sort(function(a, b) {
            return getStatus(a) - getStatus(b);
          });
          return done({
            stories: stories,
            iterationNo: iterationNo
          });
        });
      };
    })(),
    getStoryTestDetails: (function() {
      var isToday, parseTestName, parseUpdate, t, today;
      isToday = function(o) {
        var today;
        return (today = new Date()).getYear() === o.getYear() && today.getMonth() === o.getMonth() && today.getDate() === o.getDate();
      };
      parseUpdate = (function() {
        var developerRegex, ownerRegex;
        ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/;
        developerRegex = /^Developer/;
        return function(ownerString) {
          var d, match;
          if (match = ownerRegex.exec(ownerString)) {
            return {
              owner: match[1],
              status: match[2].trim(),
              date: (d = new Date(match[5])),
              isToday: isToday(d)
            };
          } else {
            return {
              owner: 'Developer',
              status: '',
              date: '',
              isToday: false
            };
          }
        };
      })();
      parseTestName = (function() {
        var testRegex;
        testRegex = /^test\d+_(.*)$/;
        return function(testName) {
          return testRegex.exec(testName)[1];
        };
      })();
      today = "" + ((t = new Date()).getMonth() + 1) + "/" + (t.getDate()) + "/" + (t.getFullYear());
      return function(storynum, done) {
        return get({
          mock: 'data/mock/MockDashboardService-getStoryTestDetails',
          real: serviceurl("iteration/stories/" + storynum + "/tests")
        }, function(tests) {
          tests = (function() {
            var _i, _len, _ref, _results;
            _results = [];
            for (_i = 0, _len = tests.length; _i < _len; _i++) {
              t = tests[_i].test;
              t.status = ((_ref = t.status) === 'pass' || _ref === 'fail' || _ref === 'na' || _ref === 'towrite') && t.status || 'unknown';
              t.update = parseUpdate(t.owner);
              _results.push(t);
            }
            return _results;
          })();
          tests.sort(function(_arg2, _arg3) {
            var a, b;
            a = _arg2.id;
            b = _arg3.id;
            return a - b;
          });
          return done(tests);
        });
      };
    })()
  };
});