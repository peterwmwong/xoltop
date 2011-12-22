
define(['data/MetricsService', 'cell!./MetricsNode', 'cell!shared/page/SectionTitle', 'cell!shared/tabletree/TableTree'], function(MetricsService, MetricsNode, SectionTitle, TableTree) {
  var ReleaseCol, dataProviders, extend;
  ReleaseCol = cell.extend({
    tag: '<span>',
    render: function(_) {
      return [_('span.ats', _('span.count', this.model.ats), 'Tests'), _('span.chumpTasks', _('span.count', this.model.chumpTasks), 'Tasks')];
    }
  });
  extend = function(destObj, srcObj) {
    var p;
    for (p in srcObj) {
      destObj[p] = srcObj[p];
    }
    return destObj;
  };
  dataProviders = {
    _: (function() {
      var getReleaseVer, releaseVerRegex, sortRelVer;
      releaseVerRegex = /(v|V)([1-9]\d*\.\d)/;
      getReleaseVer = function(rel) {
        var _ref;
        return new Number((_ref = releaseVerRegex.exec(rel != null ? rel.toLowerCase() : void 0)) != null ? _ref[2] : void 0);
      };
      sortRelVer = function(l) {
        return l.sort(function(a, b) {
          return getReleaseVer(b.name) - getReleaseVer(a.name);
        });
      };
      return {
        data: {
          id: 'ReleasesID'
        },
        getChildren: function(done) {
          return MetricsService.getReleases(function(rs) {
            var count, _;
            count = 0;
            return done((function() {
              var _i, _len, _ref, _results;
              _ref = sortRelVer(rs);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                _ = _ref[_i];
                _results.push({
                  expanded: !count++ && true || false,
                  type: 'release',
                  id: _.id,
                  data: _
                });
              }
              return _results;
            })());
          });
        }
      };
    })(),
    release: {
      nodeCell: MetricsNode.extend({
        nameLabel: 'Release',
        countColCell: ReleaseCol
      }),
      getChildren: function(done) {
        var _this = this;
        return MetricsService.getReleaseIterations(this.id, function(iters) {
          var _;
          return done((function() {
            var _i, _len, _ref, _results;
            _ref = iters.sort(function(a, b) {
              return b.id - a.id;
            });
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              _ = _ref[_i];
              _results.push({
                type: 'iteration',
                id: _.id,
                data: extend(_, {
                  release: this.id,
                  parent: this.data
                })
              });
            }
            return _results;
          }).call(_this));
        });
      }
    },
    iteration: {
      nodeCell: MetricsNode.extend({
        nameLabel: 'Iteration '
      }),
      noChildrenCell: cell.extend({
        tag: "<div class='nochildren'>",
        render: function() {
          return ['No stories'];
        }
      }),
      getChildren: function(done) {
        var _this = this;
        return MetricsService.getReleaseIterationStories({
          release: this.release,
          iteration: this.id
        }, function(stories) {
          var _;
          return done((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = stories.length; _i < _len; _i++) {
              _ = stories[_i];
              _results.push({
                type: 'story',
                id: _.id.toString(),
                data: extend(_, {
                  parent: this.data
                })
              });
            }
            return _results;
          }).call(_this));
        });
      }
    },
    chump: {
      nodeCell: MetricsNode,
      getChildren: function(done) {
        var _this = this;
        return MetricsService.getReleaseChumpStories({
          release: this.data.release,
          chump: this.id
        }, function(stories) {
          var _;
          return done((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = stories.length; _i < _len; _i++) {
              _ = stories[_i];
              _results.push({
                type: 'story',
                id: _.id.toString(),
                data: extend(_, {
                  parent: this.data
                })
              });
            }
            return _results;
          }).call(_this));
        });
      }
    },
    story: {
      nodeCell: MetricsNode.extend({
        nameColCell: cell.extend({
          tag: "<span class='nameContainer'>",
          render: function(_) {
            var url;
            url = "http://destinyxptool/xptool/projecttool/projecttool.storyview.do?storyNumber=" + this.model.data.id;
            return [
              _('a', {
                target: '_blank',
                href: '#',
                onclick: 'window.open(\"#{url}\")'
              }, this.model.data.id), _('span.name', this.model.data.name || '')
            ];
          }
        })
      })
    }
  };
  return {
    render: function(_) {
      return [
        _(SectionTitle, {
          title: 'Metrics',
          description: 'Iteration and Story complexity based on number of tasks and tests'
        }), _(TableTree, {
          id: 'Metrics',
          cols: ['ATs', 'Chump Tasks'],
          dataProviders: dataProviders
        })
      ];
    }
  };
});
