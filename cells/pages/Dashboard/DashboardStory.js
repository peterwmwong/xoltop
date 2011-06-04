var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!./Tests/TestsSection', 'cell!./Tasks/TasksSection'], function(TestsSection, TasksSection) {
  var Count;
  Count = cell.extend({
    "class": 'Count',
    'render <div>': function(R) {
      return "<a class='label' href='#'>" + this.options.label + "</a>\n" + (R(['yellow', 'red'], __bind(function(color) {
        return this.options[color] !== 0 && ("<a class='badge " + color + " count' href='#'>" + this.options[color] + "</a>");
      }, this)));
    },
    bind: (function() {
      var trigger;
      trigger = function() {
        $(this.el).trigger('selected');
        return false;
      };
      return {
        'click :parent > .label': trigger,
        'click :parent > .count': trigger
      };
    })()
  });
  return {
    render: function(R) {
      var ats, expandedSection, statusColor, tasks, _ref;
      _ref = this.model, ats = _ref.ats, tasks = _ref.tasks;
      statusColor = ats.failing + tasks.needsAttn ? 'red' : ats.unwritten + tasks.retest ? 'yellow' : ats.total + tasks.total ? 'green' : 'gray';
      expandedSection = (function() {
        switch (this.options.expandedSection) {
          case 'Tests':
            return TestsSection;
          case 'Tasks':
            return TasksSection;
        }
      }).call(this);
      return "<div id='header'>\n  <div>\n    <div id='storyID'>\n      <div id='id' class='badge " + statusColor + "'>\n        " + this.model.storynum + "\n      </div>\n    </div>\n    " + (R.cell(Count, {
        id: 'tests',
        label: 'TESTS',
        red: ats.failing,
        yellow: ats.unwritten,
        gray: ats.total
      })) + " \n    " + (R.cell(Count, {
        id: 'tasks',
        label: 'TASKS',
        red: tasks.needsAttn,
        yellow: tasks.retest,
        gray: tasks.total
      })) + " \n    <div id='name'>\n      <a href=\"#\">" + this.model.name + "</a>\n    </div>\n  </div>\n</div>\n<div class='details'>\n  " + (R((expandedSection != null) && R.cell(expandedSection))) + "\n</div>";
    },
    bind: (function() {
      var selectDetail;
      selectDetail = function(detail) {
        return function(target) {
          var $detail;
          if (detail.prototype.name !== this.options.expandedDetail) {
            this.options.expandedSection = detail.prototype.name;
            this.$('.details').toggle(true);
            this.$('.detail').toggle(false);
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              $detail = $(new detail({
                "class": 'detail',
                storynum: this.model.storynum
              }).el);
              this.$('.details').append($detail);
              debugger;
            } else {
              return $detail.toggle();
            }
          }
        };
      };
      return {
        'selected #header #tests': selectDetail(TestsSection),
        'selected #header #tasks': selectDetail(TasksSection)
      };
    })()
  };
});