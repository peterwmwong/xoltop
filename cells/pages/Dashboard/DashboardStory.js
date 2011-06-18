var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!./Tests/TestsSection', 'cell!./Tasks/TasksSection', 'cell!./Code/CodeSection'], function(TestsSection, TasksSection, CodeSection) {
  var getCodeCompleteColor;
  getCodeCompleteColor = function(pct) {
    if (typeof pct !== 'number') {
      return 'gray';
    } else if (pct < 50) {
      return 'red';
    } else if ((50 < pct && pct < 100)) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  return {
    render: function(R) {
      var ats, codeCompletePct, statusColor, tasks, _ref, _ref2;
      _ref = this.model, ats = _ref.ats, tasks = _ref.tasks, codeCompletePct = _ref.codeCompletePct;
      statusColor = codeCompletePct < 100 ? 'red' : ats.failing + tasks.needsAttn ? 'red' : ats.unwritten + tasks.retest ? 'yellow' : 'green';
      return "<div class='header'>\n  <div>\n    <div class='collapseStory'>\n      <div>\n        <div class='triangle'></div>\n        <div class='rect'></div>\n      </div>\n    </div>\n    <div class='storyID'>\n      <div class='id badge " + statusColor + "'>\n        " + this.model.storynum + "\n      </div>\n    </div>\n    <div class='countLabel code'>\n      <div><a href='#'>CODE</a></div>\n    </div>\n    <div class='countBadges code'>\n      <span class='countBadge count'>\n        <a class='" + (getCodeCompleteColor(codeCompletePct)) + "'>\n        " + (R(typeof codeCompletePct === 'number' && ("          " + (Math.floor(codeCompletePct)) + "<span class='pct'>%</span>        "))) + "\n        </a>\n      </span>\n    </div>\n    " + (R([['tests', [ats.failing, ats.unwritten, ats.total]], ['tasks', [tasks.needsAttn, tasks.retest, tasks.total]]], function(_arg) {
        var label, red, total, yellow, _ref2;
        label = _arg[0], _ref2 = _arg[1], red = _ref2[0], yellow = _ref2[1], total = _ref2[2];
        return "      <div class='" + label + " countLabel'>        <div><a href='#'>" + (label.toUpperCase()) + "</a></div>      </div>      <div class='countBadges'>        <span class='countBadge count'>        " + (red || yellow ? R([['red', red], ['yellow', yellow]], __bind(function(_arg2) {
          var color, count;
          color = _arg2[0], count = _arg2[1];
          return R(count !== 0 && ("<span class='" + color + "'>" + count + "</span>"));
        }, this)) : R("<span class='green'>" + total + "</span>")) + "        </span>      </div>    ";
      })) + "\n    <div class='name'>\n      <div>\n        <a href='#'>" + this.model.name + "</a>\n      </div>\n    </div>\n    <div class='chumps'>\n      " + (R((_ref2 = this.model.devs) != null ? _ref2.concat(this.model.testers).join("<span class='divider'>&nbsp;</span>") : void 0)) + "\n    </div>\n  </div>\n</div>\n<div class='details'></div>";
    },
    bind: (function() {
      var collapseStory, selectDetail;
      selectDetail = function(detail) {
        return function(ev) {
          var $detail, alreadySelected, detailCell;
          if (!(alreadySelected = this.$el.hasClass('selected'))) {
            this.$el.trigger('selected');
            this.$el.toggleClass('selected', true);
          }
          if (detail.prototype.name !== this.options.expandedSection) {
            this.options.expandedSection = detail.prototype.name;
            this.$('.countLabel a.selected').toggleClass('selected', false);
            $(ev.target).toggleClass('selected', true);
            this.$('.detail.selected').toggleClass('selected', false).fadeOut();
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              detailCell = new detail({
                "class": 'detail selected',
                storynum: this.model.storynum
              });
              this.$('.details').prepend(detailCell.el);
              return detailCell.ready(function() {
                return detailCell.$el.fadeIn();
              });
            } else {
              return $detail.prependTo($detail.parent()).toggleClass('selected', true).fadeIn();
            }
          }
        };
      };
      return {
        'click .tests.countLabel a': selectDetail(TestsSection),
        'click .tasks.countLabel a': selectDetail(TasksSection),
        'click .code.countLabel a': selectDetail(CodeSection),
        'click .collapseStory': collapseStory = function() {
          this.$('.detail.selected').animate({
            height: 'hide'
          }, 'slow', __bind(function() {
            this.$el.toggleClass('selected', false);
            return this.$('.countLabel a.selected').toggleClass('selected', false);
          }, this));
          return this.options.expandedSection = void 0;
        },
        'deselected': collapseStory
      };
    })()
  };
});