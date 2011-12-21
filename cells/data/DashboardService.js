
define(['data/JSONP'], function(_arg) {
  var JSONPService, getXPToolBaseUrl;
  JSONPService = _arg.JSONPService, getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  return new JSONPService('Dashboard', {
    baseURL: getXPToolBaseUrl('rest/jumbotron/'),
    methods: {
      getCurrentIterationNumber: {
        path: 'iteration/current',
        process: function(_arg2) {
          var iterationNo;
          iterationNo = _arg2.iterationInfo.iterationNo;
          return iterationNo;
        }
      },
      getIterationTestStatus: {
        path: 'iteration/tests',
        process: function(_arg2) {
          var test;
          test = _arg2.test;
          return test;
        }
      },
      getRecentTestResults: function(type) {
        return (type === 'ats' || type === 'units') && ("tests/" + type + "?recent=10");
      },
      getStoryCodeTasksDetails: function(storynum) {
        return "iteration/stories/" + storynum + "/codeTasks";
      },
      getStoryTasksDetails: function(storynum) {
        return "iteration/stories/" + storynum + "/tasks";
      },
      getStorySummaries: (function() {
        var chumpRegex, storyRegex;
        chumpRegex = /^\((.*)\)$/;
        storyRegex = /^((\w|\/)+[ ]+- )*(.*)$/;
        return {
          path: function(iterNo) {
            return "iteration/" + ((iterNo != null) && ("" + iterNo + "/") || "") + "stories/";
          },
          process: function(_arg2) {
            var atTotal, ats, codeTasks, devs, iterationNo, n, names, s, stories, tasks, testers, _ref;
            _ref = _arg2.iterationStories, iterationNo = _ref.iterationNo, stories = _ref.stories;
            stories = (function() {
              var _i, _len, _ref2, _ref3, _ref4, _results;
              _ref2 = stories || [];
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                s = _ref2[_i];
                _ref3 = (function() {
                  var _j, _len2, _ref3, _ref4, _ref5, _results2;
                  _ref5 = ((_ref3 = chumpRegex.exec(s.chumps)) != null ? (_ref4 = _ref3[1]) != null ? _ref4.split(' - ') : void 0 : void 0) || [];
                  _results2 = [];
                  for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
                    names = _ref5[_j];
                    _results2.push((function() {
                      var _k, _len3, _ref6, _results3;
                      _ref6 = names.split('/');
                      _results3 = [];
                      for (_k = 0, _len3 = _ref6.length; _k < _len3; _k++) {
                        n = _ref6[_k];
                        _results3.push(n.toUpperCase());
                      }
                      return _results3;
                    })());
                  }
                  return _results2;
                })(), devs = _ref3[0], testers = _ref3[1];
                _results.push({
                  storynum: s.num,
                  name: (_ref4 = storyRegex.exec(s.description)) != null ? _ref4[3] : void 0,
                  codeCompletePct: s.codeCompletePct,
                  codeTasksIncomplete: s.codeTasksIncomplete,
                  codeTasks: codeTasks = {
                    completePct: s.codeCompletePct,
                    notStarted: s.notStartedCodeTasks || 0,
                    inProgress: s.inProgressCodeTasks || 0,
                    completed: s.completedCodeTasks || 0
                  },
                  ats: ats = {
                    failing: s.failingATs,
                    needsAttn: s.needsAttentionATs,
                    unwritten: s.unwrittenATs,
                    total: atTotal = s.failingATs + s.passingATs + s.unwrittenATs
                  },
                  tasks: tasks = {
                    needsAttn: s.chumpTaskNA,
                    retest: s.chumpTaskRetest,
                    completed: s.chumpTaskComplete
                  },
                  testers: testers || [],
                  devs: devs || [],
                  status: (function() {
                    if (atTotal === 0 || (codeTasks.notStarted + ats.failing + ats.needsAttn + tasks.needsAttn)) {
                      return 0;
                    } else if (codeTasks.inProgress + ats.unwritten + tasks.retest) {
                      return 1;
                    } else {
                      return 2;
                    }
                  })()
                });
              }
              return _results;
            })();
            stories.sort(function(a, b) {
              return (a.status - b.status) || (a.storynum - b.storynum);
            });
            return {
              stories: stories,
              iterationNo: iterationNo
            };
          }
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
        return {
          path: function(storynum, done) {
            return "iteration/stories/" + storynum + "/tests";
          },
          process: function(tests) {
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
            return tests;
          }
        };
      })()
    }
  });
});
