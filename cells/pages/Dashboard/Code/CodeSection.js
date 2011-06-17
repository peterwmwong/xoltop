var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  return {
    render: function(R, A) {
      return DashboardService.getStoryCodeTasksDetails(this.options.storynum, __bind(function(codeTasks) {
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
              var description;
              description = _arg.task.description;
              return description;
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