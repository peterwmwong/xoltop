var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
define(['Services', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./tests/TestsSection', 'cell!./tasks/TasksSection', 'cell!./code/CodeSection', 'cell!shared/InitialsList'], function(S, LoadingIndicator, TestsSection, TasksSection, CodeSection, InitialsList) {
  var getCodeCompleteColor;
  getCodeCompleteColor = function(pct, incomplete) {
    if (typeof pct !== 'number') {
      return 'gray';
    } else if (pct < 50) {
      return 'red';
    } else if ((50 < pct && pct < 100)) {
      return 'yellow';
    } else if (incomplete > 0) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  return {
    render: function(R) {
      var ats, codeCompletePct, codeTasksIncomplete, statusColor, tasks, _ref;
      _ref = this.model, ats = _ref.ats, tasks = _ref.tasks, codeCompletePct = _ref.codeCompletePct, codeTasksIncomplete = _ref.codeTasksIncomplete;
      statusColor = codeCompletePct < 100 || ats.total === 0 ? 'red' : ats.failing + tasks.needsAttn ? 'red' : ats.unwritten + tasks.retest ? 'yellow' : 'green';
      return "<div class='header'>\n  <div>\n    <div class='collapseStory'>\n      <div class='triangle'></div>\n      <div class='rect'></div>\n    </div>\n    <div class='storyID'>\n      <div class='id badge " + statusColor + "'>\n        <span>" + this.model.storynum + "</span>\n      </div>\n    </div>\n    <div class='countCol code'>\n      <div>\n        <a href='#'>CODE</a>\n        <span class='countBadge'>\n        " + (R(typeof codeCompletePct === 'number' && ("          <span class='" + (getCodeCompleteColor(codeCompletePct, codeTasksIncomplete)) + "'>            " + (Math.floor(codeCompletePct)) + "<span class='pct'>%</span>          </span>        "))) + "\n        </span>\n      </div>\n    </div>\n    " + (R([['tests', [ats.failing, ats.unwritten, ats.total, ats.needsAttn]], ['tasks', [tasks.needsAttn, tasks.retest, tasks.total]]], function(_arg) {
        var label, needsAttn, red, total, yellow, _ref2;
        label = _arg[0], _ref2 = _arg[1], red = _ref2[0], yellow = _ref2[1], total = _ref2[2], needsAttn = _ref2[3];
        return "      <div class='countCol " + label + "'>        <div>          <a href='#'>" + (label.toUpperCase()) + "</a>          <span class='countBadge'>          " + (red || yellow || needsAttn ? R([['needsAttn', needsAttn], ['red', red], ['yellow', yellow]], __bind(function(_arg2) {
          var color, count;
          color = _arg2[0], count = _arg2[1];
          return R((count != null) && count > 0 && ("<span class='" + color + "'>" + count + "</span>"));
        }, this)) : R("<span class='" + (label === 'tests' && total === 0 ? 'red' : 'green') + "'>" + total + "</span>")) + "          </span>        </div>      </div>    ";
      })) + "\n    <div class='name'>\n      <div>\n        <a target='_blank' href='http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=" + this.model.storynum + "'>" + this.model.name + "</a>\n      </div>\n    </div>\n    <div class='chumps'>\n      " + (R.cell(InitialsList, {
        initials: __slice.call(this.model.devs).concat(__slice.call(this.model.testers))
      })) + "\n    </div>\n  </div>\n</div>\n<div class='details'>\n  " + (R.cell(LoadingIndicator)) + "\n  <div class='contents'></div>\n</div>";
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
        'click .tests.countCol': selectSection(TestsSection),
        'click .tasks.countCol': selectSection(TasksSection),
        'click .code.countCol': selectSection(CodeSection),
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