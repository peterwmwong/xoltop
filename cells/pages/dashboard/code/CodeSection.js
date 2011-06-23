var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  return {
    render: function(R, A) {
      return DashboardService.getStoryCodeTasksDetails(this.options.storynum, __bind(function(codeTasks) {
        var storynum;
        storynum = this.options.storynum;
        return A(R.cell(CatTable, {
          categories: {
            notStarted: 'Not Started',
            inProgress: 'In Progress',
            complete: 'Complete'
          },
          mapMember: function(_arg) {
            var status;
            status = _arg.task.status;
            return status;
          },
          columnMap: {
            description: function(_arg) {
              var description, id, _ref;
              _ref = _arg.task, id = _ref.id, description = _ref.description;
              return "<a target='_blank' href='" + (DashboardService.getXPToolBaseUrl("xptool/projecttool/projecttool.tasklogtime.do?taskID=" + id + "&chumpStoryID=" + storynum)) + "'>\n  " + description + "\n</a>";
            },
            owner: function(_arg) {
              var owner;
              owner = _arg.task.owner;
              return owner;
            }
          },
          members: codeTasks
        }));
      }, this));
    }
  };
});