
define(['data/MessyTestService', 'cell!shared/TableTree/TableTree', 'cell!./MessySuite', 'cell!./MessyTest'], function(MessyTestService, TableTree, MessySuite, MessyTest) {
  var IssueGroupProvider, IssueProvider, dataProviders;
  IssueGroupProvider = {
    nodeCell: cell.extend({
      render: function(R) {
        var isEmpty, _ref, _ref2, _ref3;
        this.model.expanded = !!this.model.expanded && ((_ref = this.model.data) != null ? _ref.length : void 0);
        $(this.el).toggleClass('expanded', this.model.expanded);
        isEmpty = !!((_ref2 = this.model.data) != null ? _ref2.length : void 0);
        return "<div id='expando'></div>\n<span class='count" + (R(isEmpty && ' red')) + "'>" + (((_ref3 = this.model.data) != null ? _ref3.length : void 0) || 0) + "</span>\n<a class='label" + (R(!isEmpty && ' isempty')) + "' href='#'>" + this.model.type + "</a>";
      },
      on: {
        expanded: function() {
          var _ref;
          if (!!((_ref = this.model.data) != null ? _ref.length : void 0)) {
            return $(this.el).toggleClass('expanded', this.model.expanded);
          }
        }
      }
    }),
    getChildren: function() {
      var i, _i, _len, _ref, _results;
      if (this.data instanceof Array) {
        _ref = this.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.type = 'issue';
          _results.push(i);
        }
        return _results;
      }
    }
  };
  IssueProvider = (function() {
    var format;
    format = function(o) {
      if (typeof o === 'string' && (o === '' || (isNaN(new Number(o)) && (o !== 'true' && o !== 'false')))) {
        return "\"" + o + "\"";
      } else {
        return o;
      }
    };
    return {
      nodeCell: cell.extend({
        render: function() {
          return "<span class='name'>" + this.model.fieldName + "</span>\n<span class='diff'>" + (format(this.model.before)) + "</span>\n<span class='diffArrow'>&gt</span>\n<span class='diff after'>" + (format(this.model.after)) + "</span>";
        }
      })
    };
  })();
  dataProviders = (function() {
    var issueGroups;
    issueGroups = ['DbTable', 'SysProps', 'UserProps', 'ConfigDistrict', 'ConfigSite', 'ConfigSiteDefaults'];
    return function() {
      return {
        _: {
          data: {
            id: 'Messy'
          },
          getChildren: function(done) {
            return MessyTestService.getSuites(function(suites) {
              return done((function() {
                var s, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = suites.length; _i < _len; _i++) {
                  s = suites[_i];
                  _results.push({
                    type: 'Suite',
                    data: s
                  });
                }
                return _results;
              })());
            });
          }
        },
        Suite: {
          nodeCell: MessySuite,
          getChildren: function(done) {
            return MessyTestService.getTests(this.data.suitename, function(rs) {
              return done((function() {
                var t, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = rs.length; _i < _len; _i++) {
                  t = rs[_i];
                  _results.push({
                    type: 'Test',
                    suiteName: t.suitename,
                    data: t
                  });
                }
                return _results;
              })());
            });
          }
        },
        Test: {
          nodeCell: MessyTest,
          getChildren: function(done) {
            return MessyTestService.getTestDetails(this.data.testnumber, function(rs) {
              var p, result, _i, _len, _ref;
              result = [];
              for (_i = 0, _len = issueGroups.length; _i < _len; _i++) {
                p = issueGroups[_i];
                if (!!((_ref = rs[p]) != null ? _ref.length : void 0)) {
                  result.push({
                    type: p,
                    data: rs[p],
                    expanded: true
                  });
                }
              }
              return done(result);
            });
          }
        },
        DbTable: IssueGroupProvider,
        SysProps: IssueGroupProvider,
        UserProps: IssueGroupProvider,
        ConfigDistrict: IssueGroupProvider,
        ConfigSite: IssueGroupProvider,
        ConfigSiteDefaults: IssueGroupProvider,
        issue: IssueProvider
      };
    };
  })();
  return {
    render: function(R) {
      return R(TableTree, {
        id: 'Messy',
        cols: ['Chump Tasks'],
        dataProviders: dataProviders()
      });
    }
  };
});
