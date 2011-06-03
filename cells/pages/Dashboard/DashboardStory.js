var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!./StoryDetails', 'cell!./TestDetails', 'cell!./TaskDetails'], function(StoryDetails, TestDetails, TaskDetails) {
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
      var ats, statusColor, tasks;
      ats = this.model.ats;
      tasks = this.model.tasks;
      statusColor = ats.failing + tasks.needsAttn ? 'red' : ats.unwritten + tasks.retest ? 'yellow' : ats.total + tasks.total ? 'green' : 'gray';
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
      })) + " \n    <div id='name'>\n      <a href=\"#\">" + this.model.name + "</a>\n    </div>\n  </div>\n</div>\n<div id='details'>\n  " + (R.cell(StoryDetails, {
        "class": 'detail',
        model: {
          storynum: this.model.storynum
        }
      })) + "\n  " + (R.cell(TestDetails, {
        "class": 'detail',
        model: {
          storynum: this.model.storynum
        }
      })) + "\n  " + (R.cell(TaskDetails, {
        "class": 'detail',
        model: {
          storynum: this.model.storynum
        }
      })) + "\n</div>";
    },
    bind: (function() {
      var selectDetail;
      selectDetail = function(detailName, sel) {
        return function(target) {
          console.log('hello');
          this.$('.selected').toggleClass('selected', false);
          if (detailName !== this.options.curDetail) {
            this.options.curDetail = detailName;
            this.$('#details > .detail').toggle(false);
            this.$(detailName).toggle(true).trigger('load');
            this.model.expanded = true;
          } else {
            this.model.expanded = !this.model.expanded;
          }
          this.$(sel).toggleClass('selected', this.model.expanded);
          $(this.el).toggleClass('selected', this.model.expanded);
          this.$('#details').toggleClass('expanded', this.model.expanded);
          return false;
        };
      };
      return {
        'click #header #storyID': selectDetail('.StoryDetails', '#header #storyID'),
        'selected #header #tests': selectDetail('.TestDetails', '#header #tests'),
        'selected #header #tasks': selectDetail('.TaskDetails', '#bar #tasks')
      };
    })()
  };
});