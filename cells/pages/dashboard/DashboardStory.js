var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
define(['Services', 'cell!./LabeledCounts', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./tests/TestsSection', 'cell!./tasks/TasksSection', 'cell!./code/CodeSection', 'cell!shared/InitialsList'], function(S, LabeledCounts, LoadingIndicator, TestsSection, TasksSection, CodeSection, InitialsList) {
  var statusToColor;
  statusToColor = ['red', 'yellow', 'green'];
  return {
    render: function(R) {
      return "<div class='header'>\n  <div class='collapseStory'>\n    <div class='triangle'></div>\n    <div class='rect'></div>\n  </div>\n  <div class='storyID " + statusToColor[this.model.status] + "'>\n    " + this.model.storynum + "\n  </div>\n  " + (R.cell(LabeledCounts, {
        "class": 'code',
        label: "CODE",
        showIfZero: ['green'],
        counts: __bind(function() {
          var completePct, completed, inProgress, notStarted, _ref;
          _ref = this.model.codeTasks, completePct = _ref.completePct, notStarted = _ref.notStarted, inProgress = _ref.inProgress, completed = _ref.completed;
          completePct = completePct + "<span class='codeCompletePct'>%</span>";
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
      })) + "\n  " + (R.cell(LabeledCounts, {
        "class": 'tests',
        label: "TESTS",
        showIfZero: ['green'],
        counts: __bind(function() {
          var failing, needsAttn, total, unwritten, _ref;
          _ref = this.model.ats, failing = _ref.failing, needsAttn = _ref.needsAttn, unwritten = _ref.unwritten, total = _ref.total;
          if (failing + needsAttn + unwritten) {
            return {
              red: failing,
              needsAttn: needsAttn,
              yellow: unwritten
            };
          } else {
            return {
              green: total
            };
          }
        }, this)()
      })) + "\n  " + (R.cell(LabeledCounts, {
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
      })) + "\n  <div class='nameContainer'>\n    <a class='name' target='_blank' href='http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=" + this.model.storynum + "'>" + this.model.name + "</a>\n  </div>\n  <div class='chumps'>\n    " + (R.cell(InitialsList, {
        initials: __slice.call(this.model.devs).concat(__slice.call(this.model.testers))
      })) + "\n  </div>\n</div>\n<div class='details'>\n  " + (R.cell(LoadingIndicator)) + "\n  <div class='contents'></div>\n</div>";
    },
    bind: (function() {
      var collapseStory, selectSection;
      selectSection = function(detail) {
        return function(ev) {
          var $detail, alreadySelected, detailCell;
          if (!(alreadySelected = this.$el.hasClass('selected'))) {
            this.$el.trigger('selected');
            this.$el.toggleClass('selected', true);
          }
          if (detail.prototype.name === this.options.expandedSection) {
            return collapseStory.call(this);
          } else {
            this.options.expandedSection = detail.prototype.name;
            this.$('.countCol > .selected').toggleClass('selected', false);
            $(ev.target).closest('div').toggleClass('selected', true);
            this.$('.detail.selected').toggleClass('selected', false).fadeOut();
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              detailCell = new detail({
                "class": 'detail selected',
                storynum: this.model.storynum
              });
              this.$('.details > .contents').prepend(detailCell.el);
              this.$('.LoadingIndicator').trigger('enable');
              return detailCell.ready(function() {
                this.$('.LoadingIndicator').trigger('disable');
                return detailCell.$el.fadeIn();
              });
            } else {
              return $detail.prependTo($detail.parent()).toggleClass('selected', true).fadeIn();
            }
          }
        };
      };
      return {
        'click .header > .tests': selectSection(TestsSection),
        'click .header > .tasks': selectSection(TasksSection),
        'click .header > .code': selectSection(CodeSection),
        'click .collapseStory': collapseStory = function() {
          this.$('.detail.selected').animate({
            height: 'hide'
          }, 'slow', __bind(function() {
            this.$el.toggleClass('selected', false);
            return this.$('.countCol > .selected').toggleClass('selected', false);
          }, this));
          return this.options.expandedSection = void 0;
        },
        'deselected': collapseStory
      };
    })()
  };
});