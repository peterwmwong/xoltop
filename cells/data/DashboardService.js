define(['data/JSONP'], function(jsonp) {
  var get, xptoolurl;
  xptoolurl = function(path) {
    return "http://172.16.19.63:69/xptool/rest/jumbotron/" + path;
  };
  get = function(testpath, url, done) {
    var TESTING;
    if (TESTING = true) {
      require([testpath], done);
    } else {
      jsonp({
        callback: 'jsonp',
        url: url,
        success: done
      });
    }
  };
  return {
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
        return get('data/MockDashboardService-getRecentTestResults-smalls', "http://build-linux-01.fdr.follett.com:8080/ci/view/Destiny/job/destiny-small-tests/lastCompletedBuild/testReport/api/json");
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
      return get('data/MockDashboardService-getStoryCodeTasksDetail', xptoolurl("iteration/stories/" + storynum + "/codetasks"), done);
    },
    getStoryTasksDetails: function(storynum, done) {
      return get('data/MockDashboardService-getStoryTasksDetail', xptoolurl("iteration/stories/" + storynum + "/tasks"), done);
    },
    getStorySummaries: (function() {
      var storyRegex;
      storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/;
      return function(done) {
        return get('data/MockDashboardService-getStorySummaries', xptoolurl('iteration/stories/'), function(stories) {
          return done((function() {
            var devs, match, s, story, testers, _i, _len, _ref, _ref2, _ref3, _ref4, _ref5, _results;
            _ref = stories.sort(function(_arg, _arg2) {
              var a, b;
              a = _arg.story;
              b = _arg2.story;
              return a.num - b.num;
            });
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              s = _ref[_i].story;
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
                _ref3 = match[5] && ((_ref2 = match[5]) != null ? _ref2.split(' - ') : void 0) || [], devs = _ref3[0], testers = _ref3[1];
                story.storynum = s.num;
                story.name = match[3];
                story.testers = testers != null ? testers.split('/') : void 0;
                story.devs = devs != null ? devs.split('/') : void 0;
                story.tags = (_ref4 = match[1]) != null ? (_ref5 = _ref4.split(' - ')) != null ? _ref5.slice(0, -1) : void 0 : void 0;
              }
              _results.push(story);
            }
            return _results;
          })());
        });
      };
    })(),
    getStoryTestDetails: (function() {
      var parseTestName, parseUpdate, t, today;
      parseUpdate = (function() {
        var developerRegex, isToday, ownerRegex;
        ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/;
        developerRegex = /^Developer/;
        isToday = function(o) {
          var today;
          return (today = new Date()).getYear() === o.getYear() && today.getMonth() === o.getMonth() && today.getDate() === o.getDate();
        };
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
            var _i, _len, _ref, _results;
            _results = [];
            for (_i = 0, _len = tests.length; _i < _len; _i++) {
              t = tests[_i].test;
              t.status = ((_ref = t.status) === 'pass' || _ref === 'fail' || _ref === 'towrite') && t.status || 'unknown';
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