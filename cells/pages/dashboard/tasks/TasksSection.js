var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  return {
    render: function(R, A) {
      return DashboardService.getStoryTasksDetails(this.options.storynum, __bind(function(tasks) {
        console.log(tasks);
        return A(R.cell(CatTable, {
          categories: {
            needsAttn: 'Needs Attention',
            retest: 'Retest',
            complete: 'Complete'
          },
          mapMember: function(_arg) {
            var task;
            task = _arg.task;
            return task.category;
          },
          columnMap: {
            note: function(_arg) {
              var chumpTaskID, note, _ref;
              _ref = _arg.task, note = _ref.note, chumpTaskID = _ref.chumpTaskID;
              return "<a target='_blank' href='" + (DashboardService.getXPToolBaseUrl("projecttool/projecttool.taskview.do?taskID=" + chumpTaskID)) + "'>\n  " + note + "\n</a>";
            },
            owner: function(_arg) {
              var task;
              task = _arg.task;
              return task.owner;
            }
          },
          members: tasks
        }));
      }, this));
    },
    bind: {
      afterRender: function() {
        return this.$('.column.note br').replaceWith("<div class='linebreak'></div>");
      }
    }
  };
});