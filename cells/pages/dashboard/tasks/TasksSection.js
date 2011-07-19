var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/cattable/CatTable'], function(S, CatTable) {
  return {
    render: function(R, A) {
      return S.dashboard.getStoryTasksDetails(this.options.storynum, __bind(function(tasks) {
        return A([
          (tasks != null ? tasks.length : void 0) === 0 ? R('.notests', 'No Tasks') : R(CatTable, {
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
                return $("<a target='_blank' href='" + (S.getXPToolBaseUrl("projecttool/projecttool.taskview.do?taskID=" + chumpTaskID)) + "'>                    " + note + "                   </a>")[0];
              },
              owner: function(_arg) {
                var task;
                task = _arg.task;
                return task.owner;
              }
            },
            members: tasks
          })
        ]);
      }, this));
    }
  };
});