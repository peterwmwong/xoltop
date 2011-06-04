define(['data/JSONP'], function(jsonp) {
  var StorySum, get, storyRegex;
  get = function(path, done) {
    jsonp({
      url: 'http://172.16.19.63:69/xptool/rest/jumbotron/iteration/' + path,
      success: function(dataArray) {
        return done(dataArray);
      }
    });
  };
  storyRegex = /^((\w*[ ]+- )+)?(.*?)( \(([^\)]+)\))?$/;
  StorySum = function(obj) {
    return {
      story: obj
    };
  };
  return {
    getStorySummaries: function(done) {
      var stories;
      stories = [
        {
          "story": {
            "chumpTaskComplete": 0,
            "chumpTaskNA": 0,
            "chumpTaskRetest": 2,
            "chumps": "(EG - CSZ)",
            "description": "ECS - Standards Integration client.jar",
            "failingATs": 0,
            "inProgressATs": 0,
            "needsAttentionATs": 0,
            "num": 52314,
            "passingATs": 0,
            "tasks": 4,
            "unwrittenATs": 0
          }
        }, {
          "story": {
            "chumpTaskComplete": 14,
            "chumpTaskNA": 0,
            "chumpTaskRetest": 0,
            "chumps": "(LL - LR)",
            "description": "TECH  - state merge needs to be redesigned to be transactional for Destiny 10.0",
            "failingATs": 0,
            "inProgressATs": 0,
            "needsAttentionATs": 0,
            "num": 52601,
            "passingATs": 1,
            "tasks": 1,
            "unwrittenATs": 0
          }
        }, {
          "story": {
            "chumpTaskComplete": 0,
            "chumpTaskNA": 0,
            "chumpTaskRetest": 0,
            "chumps": "(PW)",
            "description": "TECH - Performance for SC",
            "failingATs": 0,
            "inProgressATs": 0,
            "needsAttentionATs": 0,
            "num": 52841,
            "passingATs": 0,
            "tasks": 0,
            "unwrittenATs": 0
          }
        }, {
          "story": {
            "chumpTaskComplete": 3,
            "chumpTaskNA": 0,
            "chumpTaskRetest": 0,
            "chumps": "(AB\/TF\/CM - MKC)",
            "description": "TM - STATE - Restrict Titles from Ordering",
            "failingATs": 3,
            "inProgressATs": 0,
            "needsAttentionATs": 0,
            "num": 52493,
            "passingATs": 10,
            "tasks": 2,
            "unwrittenATs": 6
          }
        }, {
          "story": {
            "chumpTaskComplete": 0,
            "chumpTaskNA": 0,
            "chumpTaskRetest": 0,
            "chumps": "(JW\/BP - FM)",
            "description": "TECH  - state synch queue refactor - keep record of failed synch actions - required for 10.0",
            "failingATs": 0,
            "inProgressATs": 0,
            "needsAttentionATs": 0,
            "num": 52600,
            "passingATs": 0,
            "tasks": 2,
            "unwrittenATs": 0
          }
        }
      ];
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
    },
    getStoryTestDetails: (function() {
      var parseTestName, parseUpdate, t, test, today;
      parseUpdate = (function() {
        var isToday, ownerRegex;
        ownerRegex = /^(\w*)[ ]+(([a-zA-Z ])*?)(-[ ]*)?(\d+\/\d+\/\d\d\d\d)/;
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
          return {
            owner: match[1],
            status: match[2].trim(),
            date: (d = new Date(match[5])),
            isToday: isToday(d)
          };
        };
      })();
      parseTestName = (function() {
        var testRegex;
        testRegex = /^test\d+_(.*)$/;
        return function(testName) {
          return testRegex.exec(testName)[1];
        };
      })();
      test = function(id, name, owner, status) {
        return {
          id: id,
          name: name,
          owner: owner,
          status: status != null ? status : 'passing'
        };
      };
      today = "" + ((t = new Date()).getMonth() + 1) + "/" + (t.getDate()) + "/" + (t.getFullYear());
      return function(storynum, done) {
        var testDetails;
        testDetails = {
          storynum: storynum,
          tests: [test(29946, "test29946_QuestBookClubCreateShelvesBookStaysInAssignedShelf", 'twalker Passes locally - 10/27/2010', 'failing'), test(30030, "test30030_StateRestrictTitlesFromOrdering_SiteRestrictedTitles_TitleDetailsLink", 'dwatling In Progress 1/4/2010', 'passing'), test(30031, "test30031_StateRestrictTitlesFromOrdering_PreOrder_Programs_UnrestrictedTitle", 'tfeldmann In Progress 1/13/2010', ''), test(26787, "test26787_QuestBookClubCreateShelvesIfItemExistsInOneShelfAndAddedToAnotherItWillBeMoved", 'pwong Fixed - ' + today, 'failing')]
        };
        return (function(testDetails) {
          var array, cat, t, tests, _i, _len, _ref, _ref2;
          tests = {
            passing: [],
            failing: [],
            towrite: []
          };
          _ref = testDetails.tests;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            t.category = (_ref2 = t.status) === 'passing' || _ref2 === 'failing' ? t.status : 'towrite';
            t.update = parseUpdate(t.owner);
            t.name = parseTestName(t.name);
            tests[t.category].push(t);
          }
          for (cat in tests) {
            array = tests[cat];
            array.sort(function(a, b) {
              return a.id - b.id;
            });
          }
          testDetails.tests = tests;
          console.log(testDetails);
          return done(testDetails);
        })(testDetails);
      };
    })(),
    getStoryTaskDetails: function(storynum, done) {
      var taskDetails;
      taskDetails = [
        {
          id: 12499,
          name: 'Patron Comments Global Delete',
          owner: 'JW',
          tasks: {
            needsAttn: [
              {
                id: 55555,
                note: 'Please change the permission description',
                updatedBy: 'lrossell'
              }, {
                id: 55556,
                note: 'When viewing My Quest Updates when someone made a comment on my shelf mov',
                updatedBy: 'lrossell'
              }
            ],
            retest: [
              {
                id: 55557,
                note: 'Stuff',
                updatedBy: 'pwong'
              }, {
                id: 55558,
                note: 'Stuffy 2',
                updatedBy: 'pwong'
              }
            ]
          }
        }, {
          id: 12504,
          name: 'DB Upgrade and Cleanup Script',
          owner: 'TF',
          tasks: {
            needsAttn: [
              {
                id: 55555,
                note: 'DB Please change the permission description',
                updatedBy: 'lrossell'
              }, {
                id: 55556,
                note: 'DB When viewing My Quest Updates when someone made a comment on my shelf mov',
                updatedBy: 'lrossell'
              }
            ],
            retest: [
              {
                id: 55557,
                note: 'DB Stuff',
                updatedBy: 'pwong'
              }, {
                id: 55558,
                note: 'DB Stuffy 2',
                updatedBy: 'pwong'
              }
            ]
          }
        }
      ];
      return done(taskDetails);
    }
  };
});