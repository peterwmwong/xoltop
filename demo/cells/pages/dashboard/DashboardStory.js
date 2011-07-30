var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
define(['Services', 'cell!./LabeledCounts', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./tests/TestsSection', 'cell!./tasks/TasksSection', 'cell!./code/CodeSection', 'cell!shared/InitialsList'], function(S, LabeledCounts, LoadingIndicator, TestsSection, TasksSection, CodeSection, InitialsList) {
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
      selectSection = function(detail) {
        return function(ev) {
          var $detail, detailCell;
          this.$('.LabeledCounts.selected').toggleClass('selected', false);
          if (!(this.$el.hasClass('selected'))) {
            this.$el.trigger('selected');
            this.$el.toggleClass('selected', true);
          }
          if (detail.prototype.name === this.options.expandedSection) {
            return collapseStory.call(this);
          } else {
            this.options.expandedSection = detail.prototype.name;
            this.$('.countCol > .selected').toggleClass('selected', false);
            $(ev.target).closest('.LabeledCounts').toggleClass('selected', true);
            this.$('.detail.selected').toggleClass('selected', false);
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              detailCell = new detail({
                "class": 'detail',
                storynum: this.model.storynum
              });
              this.$('.details > .contents').prepend(detailCell.el);
              this.$('.LoadingIndicator').trigger('enable');
              return detailCell.ready(__bind(function() {
                this.$('.LoadingIndicator').trigger('disable');
                detailCell.$el.toggleClass('selected', true);
                return this.$('.details').height("" + (detailCell.$el.outerHeight()) + "px");
              }, this));
            } else {
              $detail.prependTo($detail.parent());
              return setTimeout(__bind(function() {
                $detail.toggleClass('selected', true);
                return this.$('.details').height("" + ($detail.outerHeight()) + "px");
              }, this), 0);
            }
          }
        };
      };
      return {
        'click .header > .tests': selectSection(TestsSection),
        'click .header > .tasks': selectSection(TasksSection),
        'click .header > .code': selectSection(CodeSection),
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