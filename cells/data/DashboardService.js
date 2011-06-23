define(['data/JSONP'], function(jsonp) {
  var TESTING, get, getXPToolBaseUrl, xptoolurl, _ref, _ref2;
  TESTING = (_ref = window.xoltop) != null ? (_ref2 = _ref.DashboardService) != null ? _ref2.useMockData : void 0 : void 0;
  xptoolurl = function(path) {
    return getXPToolBaseUrl("rest/jumbotron/" + path);
  };
  get = (function() {
    var defer;
    defer = function(f) {
      return setTimeout(f, 0);
    };
    return function(testpath, url, done) {
      if (TESTING) {
        defer(function() {
          return require([testpath], done);
        });
      } else {
        jsonp({
          callback: 'jsonp',
          url: url,
          success: done
        });
      }
    };
  })();
  return {
    getXPToolBaseUrl: getXPToolBaseUrl = function(relPath) {
      return "http://172.16.19.63:69/xptool/" + relPath;
    },
    getCurrentIterationNumber: function(done) {
      return get('data/MockDashboardService-getCurrentIterationNumber', xptoolurl("/iteration/current"), function(_arg) {
        var iterationNo;
        iterationNo = _arg.iterationInfo.iterationNo;
        return done(iterationNo);
      });
    },
    getIterationTestStatus: function(done) {
      return get('data/MockDashboardService-getIterationTestStatus', xptoolurl("iteration/tests"), function(_arg) {
        var test;
        test = _arg.test;
        return done(test);
      });
    },
    getRecentTestResults: function(type, done) {
      if (type === 'ats' || type === 'units') {
        return get("data/MockDashboardService-getRecentTestResults-" + type, xptoolurl("tests/" + type + "?recent=10"), done);
      } else if (type === 'smalls') {
        return get('data/MockDashboardService-getRecentTestResults-smalls', "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json", done);
      }
    },
    getTestStatus: function(done) {
      return get('data/MockDashboardService-getTestStatus', xptoolurl("testsnapshot"), function(_arg) {
        var tests;
        tests = _arg.tests;
        return get('data/MockDashboardService-getTestStatus-smallTests', "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json", function(_arg2) {
          var failCount;
          failCount = _arg2.failCount;
          tests.failingSmalls = failCount;
          return done(tests);
        });
      });
    },
    getStoryCodeTasksDetails: function(storynum, done) {
      return get('data/MockDashboardService-getStoryCodeTasksDetail', xptoolurl("iteration/stories/" + storynum + "/codeTasks"), done);
    },
    getStoryTasksDetails: function(storynum, done) {
      return get('data/MockDashboardService-getStoryTasksDetail', xptoolurl("iteration/stories/" + storynum + "/tasks"), done);
    },
    getStorySummaries: (function() {
      var getStatus, storyRegex;
      storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/;
      getStatus = function(_arg) {
        var ats, codeCompletePct, tasks;
        codeCompletePct = _arg.codeCompletePct, ats = _arg.ats, tasks = _arg.tasks;
        if (codeCompletePct < 100) {
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
        return get('data/MockDashboardService-getStorySummaries', xptoolurl("iteration/" + ((iterNo != null) && ("" + iterNo + "/") || "") + "stories/"), function(_arg) {
          var iterationNo, stories, _ref3;
          _ref3 = _arg.iterationStories, iterationNo = _ref3.iterationNo, stories = _ref3.stories;
          stories = (function() {
            var devs, match, s, story, testers, _i, _len, _ref4, _ref5, _ref6, _ref7, _ref8, _results;
            _ref4 = stories.sort(function(_arg2, _arg3) {
              var a, b;
              a = _arg2.num;
              b = _arg3.num;
              return a - b;
            });
            _results = [];
            for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
              s = _ref4[_i];
              story = {
                codeCompletePct: s.codeCompletePct,
                type: 'story',
                ats: {
                  failing: s.failingATs,
                  unwritten: s.unwrittenATs,
                  total: s.failingATs + s.passingATs + s.unwrittenATs
                },
                tasks: {
                  retest: s.chumpTaskRetest,
                  needsAttn: s.chumpTaskNA,
                  total: s.chumpTaskComplete
                }
              };
              if (match = storyRegex.exec(s.description + ' ' + s.chumps)) {
                _ref6 = match[5] && ((_ref5 = match[5]) != null ? _ref5.split(' - ') : void 0) || [], devs = _ref6[0], testers = _ref6[1];
                story.storynum = s.num;
                story.name = match[3];
                story.testers = testers != null ? testers.split('/') : void 0;
                story.devs = devs != null ? devs.split('/') : void 0;
                story.tags = (_ref7 = match[1]) != null ? (_ref8 = _ref7.split(' - ')) != null ? _ref8.slice(0, -1) : void 0 : void 0;
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
        return get('data/MockDashboardService-getStoryTestDetails', xptoolurl("iteration/stories/" + storynum + "/tests"), function(tests) {
          tests = (function() {
            var _i, _len, _ref3, _results;
            _results = [];
            for (_i = 0, _len = tests.length; _i < _len; _i++) {
              t = tests[_i].test;
              t.status = ((_ref3 = t.status) === 'pass' || _ref3 === 'fail' || _ref3 === 'na' || _ref3 === 'towrite') && t.status || 'unknown';
              t.update = parseUpdate(t.owner);
              _results.push(t);
            }
            return _results;
          })();
          tests.sort(function(_arg, _arg2) {
            var a, b;
            a = _arg.id;
            b = _arg2.id;
            return a - b;
          });
          return done(tests);
        });
      };
    })()
  };
});