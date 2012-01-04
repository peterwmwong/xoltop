var __slice = Array.prototype.slice;

define(['require', 'Services', 'cell!./LabeledCounts', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!shared/InitialsList'], function(require, S, LabeledCounts, LoadingIndicator, InitialsList) {
  var statusToColor;
  statusToColor = ['red', 'yellow', 'green'];
  return {
    render: function(_) {
      var _this = this;
      return [
        _('.header', _('.collapseStory', _('.triangle'), _('.rect')), _(".storyID." + statusToColor[this.model.status], this.model.storynum), _(LabeledCounts, {
          "class": 'code',
          label: "CODE",
          showIfZero: ['green'],
          counts: (function() {
            var completePct, completed, inProgress, notStarted, _ref;
            _ref = _this.model.codeTasks, completePct = _ref.completePct, notStarted = _ref.notStarted, inProgress = _ref.inProgress, completed = _ref.completed;
            completePct = [completePct, _('span.codeCompletePct', '%')];
            if (notStarted) {
              return {
                red: completePct
              };
            } else if (inProgress) {
              return {
                yellow: completePct
              };
            } else {
              return {
                green: completePct
              };
            }
          })()
        }), _(LabeledCounts, {
          "class": 'tests',
          label: "TESTS",
          showIfZero: ['notests'],
          counts: (function() {
            var failing, needsAttn, total, unwritten, _ref;
            _ref = _this.model.ats, failing = _ref.failing, needsAttn = _ref.needsAttn, unwritten = _ref.unwritten, total = _ref.total;
            if (failing + needsAttn + unwritten) {
              return {
                red: failing,
                needsAttn: needsAttn,
                yellow: unwritten
              };
            } else if (total === 0) {
              return {
                notests: 0
              };
            } else {
              return {
                green: total
              };
            }
          })()
        }), _(LabeledCounts, {
          "class": 'tasks',
          label: "TASKS",
          showIfZero: ['green'],
          counts: (function() {
            var completed, needsAttn, retest, _ref;
            _ref = _this.model.tasks, needsAttn = _ref.needsAttn, retest = _ref.retest, completed = _ref.completed;
            if (needsAttn + retest) {
              return {
                red: needsAttn,
                yellow: retest
              };
            } else {
              return {
                green: completed
              };
            }
          })()
        }), _('.nameContainer', _('a.name', {
          target: '_blank',
          href: "http://destinyxptool/xptool/projecttool/projecttool.storyview.do?storyNumber=" + this.model.storynum
        }, this.model.name)), _('.chumps', _(InitialsList, {
          initials: __slice.call(this.model.devs).concat(__slice.call(this.model.testers))
        }))), _('.details', _(LoadingIndicator), _('.contents'))
      ];
    },
    on: (function() {
      var collapseStory, selectSection;
      selectSection = function(detailCellPath) {
        var detailName;
        detailName = detailCellPath.split('/').slice(-1);
        return function(ev) {
          var _this = this;
          this.$('.LabeledCounts.selected').toggleClass('selected', false);
          if (!(this.$el.hasClass('selected'))) {
            this.$el.trigger('selected');
            this.$el.toggleClass('selected', true);
          }
          if (detailName === this.options.expandedSection) {
            return collapseStory.call(this);
          } else {
            this.options.expandedSection = detailName;
            this.$('.countCol > .selected').toggleClass('selected', false);
            $(ev.target).closest('.LabeledCounts').toggleClass('selected', true);
            this.$('.detail.selected').toggleClass('selected', false);
            this.$('.LoadingIndicator').trigger('enable');
            return require(["cell!" + detailCellPath], function(detail) {
              var $detail, detailCell;
              if (!($detail = _this.$("." + detail.prototype.name))[0]) {
                detailCell = new detail({
                  "class": 'detail',
                  storynum: _this.model.storynum
                });
                _this.$('.details > .contents').prepend(detailCell.el);
                return detailCell.$el.toggleClass('selected', true);
              } else {
                $detail.prependTo($detail.parent());
                return setTimeout(function() {
                  _this.$('.LoadingIndicator').trigger('disable');
                  $detail.toggleClass('selected', true);
                  return _this.$('.details').height("" + ($detail.outerHeight()) + "px");
                }, 0);
              }
            });
          }
        };
      };
      return {
        'loaded .details > .contents > .detail.selected': function() {
          this.$('.LoadingIndicator').trigger('disable');
          return this.$('.details').height("" + (this.$('.detail.selected').outerHeight()) + "px");
        },
        'click .header > .tests': selectSection('./tests/TestsSection'),
        'click .header > .tasks': selectSection('./tasks/TasksSection'),
        'click .header > .code': selectSection('./code/CodeSection'),
        'click .collapseStory': collapseStory = function() {
          this.$('.LabeledCounts.selected, .detail.selected').toggleClass('selected', false);
          this.$el.toggleClass('selected', false);
          this.$('.details').height('0px');
          return this.options.expandedSection = void 0;
        },
        'deselected': collapseStory
      };
    })()
  };
});
