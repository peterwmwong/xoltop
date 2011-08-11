var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
define(['require', 'Services', 'cell!./LabeledCounts', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!shared/InitialsList'], function(require, S, LabeledCounts, LoadingIndicator, InitialsList) {
  var statusToColor;
  statusToColor = ['red', 'yellow', 'green'];
  return {
    render: function(R) {
      return [
        R('.header', R('.collapseStory', R('.triangle'), R('.rect')), R(".storyID." + statusToColor[this.model.status], this.model.storynum), R(LabeledCounts, {
          "class": 'code',
          label: "CODE",
          showIfZero: ['green'],
          counts: __bind(function() {
            var completePct, completed, inProgress, notStarted, _ref;
            _ref = this.model.codeTasks, completePct = _ref.completePct, notStarted = _ref.notStarted, inProgress = _ref.inProgress, completed = _ref.completed;
            completePct = [completePct, R('span.codeCompletePct', '%')];
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
          }, this)()
        }), R(LabeledCounts, {
          "class": 'tests',
          label: "TESTS",
          showIfZero: ['notests'],
          counts: __bind(function() {
            var failing, needsAttn, total, unwritten, _ref;
            _ref = this.model.ats, failing = _ref.failing, needsAttn = _ref.needsAttn, unwritten = _ref.unwritten, total = _ref.total;
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
          }, this)()
        }), R(LabeledCounts, {
          "class": 'tasks',
          label: "TASKS",
          showIfZero: ['green'],
          counts: __bind(function() {
            var completed, needsAttn, retest, _ref;
            _ref = this.model.tasks, needsAttn = _ref.needsAttn, retest = _ref.retest, completed = _ref.completed;
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
          }, this)()
        }), R('.nameContainer', R('a.name', {
          target: '_blank',
          href: "http://destinyxptool/xptool/projecttool/projecttool.storyview.do?storyNumber=" + this.model.storynum
        }, this.model.name)), R('.chumps', R(InitialsList, {
          initials: __slice.call(this.model.devs).concat(__slice.call(this.model.testers))
        }))), R('.details', R(LoadingIndicator), R('.contents'))
      ];
    },
    bind: (function() {
      var collapseStory, selectSection;
      selectSection = function(detailCellPath) {
        var detailName;
        detailName = detailCellPath.split('/').slice(-1);
        return function(ev) {
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
            return require(["cell!" + detailCellPath], __bind(function(detail) {
              var $detail, detailCell;
              if (!($detail = this.$("." + detail.prototype.name))[0]) {
                detailCell = new detail({
                  "class": 'detail',
                  storynum: this.model.storynum
                });
                this.$('.details > .contents').prepend(detailCell.el);
                return detailCell.ready(__bind(function() {
                  this.$('.LoadingIndicator').trigger('disable');
                  detailCell.$el.toggleClass('selected', true);
                  return this.$('.details').height("" + (detailCell.$el.outerHeight()) + "px");
                }, this));
              } else {
                $detail.prependTo($detail.parent());
                return setTimeout(__bind(function() {
                  this.$('.LoadingIndicator').trigger('disable');
                  $detail.toggleClass('selected', true);
                  return this.$('.details').height("" + ($detail.outerHeight()) + "px");
                }, this), 0);
              }
            }, this));
          }
        };
      };
      return {
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