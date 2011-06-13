define(['data/JSONP'], function(jsonp) {
  var O, TESTING, get, storyRegex;
  O = function(obj) {
    return obj;
  };
  TESTING = true;
  get = function(path, done) {
    jsonp({
      url: 'http://172.16.19.63:69/xptool/rest/jumbotron/iteration/' + path,
      success: function(dataArray) {
        return done(dataArray);
      }
    });
  };
  storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/;
  return {
    getStoryTasksDetails: function(storynum, done) {
      var doDone;
      doDone = function(chumpTasks) {
        return done(chumpTasks);
      };
      if (TESTING) {
        return require(['data/MockDashboardService-getStoryTasksDetail'], doDone);
      } else {
        return get("stories/" + storynum + "/tasks", doDone);
      }
    },
    getStorySummaries: function(done) {
      var doDone;
      doDone = function(stories) {
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
      };
      if (TESTING) {
        return require(['data/MockDashboardService-getStorySummaries'], doDone);
      } else {
        return get('stories', doDone);
      }
    },
    getStoryTestDetails: (function() {
      var parseTestName, parseUpdate, t, today;
      parseUpdate = (function() {
        var developerRegex, isToday, ownerRegex;
        ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/;
        developerRegex = /^Developer/;
        isToday = (function() {
          var d, m, today, y;
          y = (today = new Date()).getYear();
          m = today.getMonth();
          d = today.getDate();
          return function(o) {
            return y === o.getYear() && m === o.getMonth() && d === o.getDate();
          };
        })();
        return function(ownerString) {
          var d, match;
          match = ownerRegex.exec(ownerString);
          if (match) {
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
        var doDone;
        doDone = function(tests) {
          tests = (function() {
            var _i, _len, _ref, _results;
            _results = [];
            for (_i = 0, _len = tests.length; _i < _len; _i++) {
              t = tests[_i].test;
              t.status = (_ref = t.status) === 'pass' || _ref === 'fail' || _ref === 'towrite' ? t.status : 'unknown';
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
        };
        if (TESTING) {
          return require(['data/MockDashboardService-getStoryTestDetails'], doDone);
        } else {
          return get("stories/" + storynum + "/tests", doDone);
        }
      };
    })()
  };
});