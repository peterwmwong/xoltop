var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!./Tests/TestsSection', 'cell!./Tasks/TasksSection'], function(TestsSection, TasksSection) {
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
      return "<div class='header'>\n  <div>\n    <div class='storyID'>\n      <div class='id badge " + statusColor + "'>\n        " + this.model.storynum + "\n      </div>\n    </div>\n    " + (R([['tests', [ats.failing, ats.unwritten]], ['tasks', [tasks.needsAttn, tasks.retest]]], function(_arg) {
        var label, red, yellow, _ref2;
        label = _arg[0], _ref2 = _arg[1], red = _ref2[0], yellow = _ref2[1];
        return "      <div class='" + label + " countLabel'>        <div><a href='#'>" + (label.toUpperCase()) + "</a></div>      </div>      <div class='countBadges'>      " + (R([['red', red], ['yellow', yellow]], __bind(function(_arg2) {
          var color, count;
          color = _arg2[0], count = _arg2[1];
          return count !== 0 && ("<a class='badge " + color + " count'>" + count + "</a>");
        }, this))) + "               </div>    ";
      })) + "\n    <div class='name'>\n      <div><a href='#'>" + this.model.name + "</a></div>\n    </div>\n  </div>\n</div>\n<div class='details' style='display: " + (initExpandedSection && 'block' || 'none') + "'>\n  " + (R((initExpandedSection != null) && R.cell(initExpandedSection, {
        "class": 'detail',
        storynum: this.model.storynum
      }))) + "\n</div>";
    },
    bind: (function() {
      var selectDetail;
      selectDetail = function(detail) {
        return function(ev) {
          var $detail, detailCell;
          if (detail.prototype.name !== this.options.expandedSection) {
            this.options.expandedSection = detail.prototype.name;
            this.$('.countLabel a.selected').toggleClass('selected', false);
            $(ev.target).toggleClass('selected', true);
            this.$('.details').toggle(true);
            this.$('.detail').toggle(false);
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              detailCell = new detail({
                "class": 'detail',
                storynum: this.model.storynum
              });
              this.$('.details').append(detailCell.el);
              return detailCell.ready(function() {
                return detailCell.$el.animate({
                  height: 'toggle'
                }, 'slow');
              });
            } else {
              return $detail.animate({
                height: 'toggle'
              }, 'slow');
            }
          }
        };
      };
      return {
        'click .tests.countLabel a': selectDetail(TestsSection, '.tests.countLabel'),
        'click .tasks.countLabel a': selectDetail(TasksSection, '.tasks.countLabel')
      };
    })()
  };
});