var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!./Tests/TestsSection', 'cell!./Tasks/TasksSection'], function(TestsSection, TasksSection) {
  var getCodeCompleteColor;
  getCodeCompleteColor = function(pct) {
    if (pct < 50) {
      return 'red';
    } else if ((50 < pct && pct < 100)) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  return {
    render: function(R) {
      var ats, initExpandedSection, statusColor, tasks, _ref;
      _ref = this.model, ats = _ref.ats, tasks = _ref.tasks;
      statusColor = ats.failing + tasks.needsAttn ? 'red' : ats.unwritten + tasks.retest ? 'yellow' : ats.total + tasks.total ? 'green' : 'gray';
      initExpandedSection = (function() {
        switch (this.options.expandedSection) {
          case 'TestsSection':
            return TestsSection;
          case 'TasksSection':
            return TasksSection;
        }
      }).call(this);
      console.log(this.model);
      return "<div class='header'>\n  <div>\n    <div class='storyID'>\n      <div class='id badge " + statusColor + "'>\n        " + this.model.storynum + "\n      </div>\n    </div>\n    <div class='name'>\n      <div>\n        <span class='chumps'>" + (this.model.devs.concat(this.model.testers).join("<span class='divider'>&nbsp;</span>")) + "</span>\n        <a href='#'>" + this.model.name + "</a>\n      </div>\n    </div>\n    <div class='countLabel code'>\n      <div><a href='#'>CODE</a></div>\n    </div>\n    <div class='countBadges code'>\n      <a class='badge " + (getCodeCompleteColor(this.model.codeCompletePct)) + " count'>\n        " + (Math.floor(this.model.codeCompletePct)) + "<span class='pct'>%</span>\n      </a>\n    </div>\n    " + (R([['tests', [ats.failing, ats.unwritten]], ['tasks', [tasks.needsAttn, tasks.retest]]], function(_arg) {
        var label, red, yellow, _ref2;
        label = _arg[0], _ref2 = _arg[1], red = _ref2[0], yellow = _ref2[1];
        return "      <div class='" + label + " countLabel'>        <div><a href='#'>" + (label.toUpperCase()) + "</a></div>      </div>      <div class='countBadges'>      " + (R([['red', red], ['yellow', yellow]], __bind(function(_arg2) {
          var color, count;
          color = _arg2[0], count = _arg2[1];
          return count !== 0 && ("<a class='badge " + color + " count'>" + count + "</a>");
        }, this))) + "               </div>    ";
      })) + "\n    <div class='collapseStory'>\n      <div class='triangle'></div>\n      <div class='rect'></div>\n    </div>\n  </div>\n</div>\n<div class='details'>\n  " + (R((initExpandedSection != null) && R.cell(initExpandedSection, {
        "class": 'detail',
        storynum: this.model.storynum
      }))) + "\n</div>";
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
              this.$('.details').append(detailCell.el);
              return detailCell.ready(function() {
                if (alreadySelected) {
                  return detailCell.$el.fadeIn();
                } else {
                  return detailCell.$el.animate({
                    height: 'show'
                  }, 'slow');
                }
              });
            } else {
              $detail.toggleClass('selected', true);
              if (alreadySelected) {
                return $detail.fadeIn();
              } else {
                return $detail.animate({
                  height: 'show'
                }, 'slow');
              }
            }
          }
        };
      };
      return {
        'click .tests.countLabel a': selectDetail(TestsSection, '.tests.countLabel'),
        'click .tasks.countLabel a': selectDetail(TasksSection, '.tasks.countLabel'),
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