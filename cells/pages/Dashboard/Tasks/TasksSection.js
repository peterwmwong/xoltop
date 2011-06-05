var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  return {
    render: function(R, A) {
      return DashboardService.getStoryTasksDetails(this.options.storynum, __bind(function(tasks) {
        return A(R.cell(CatTable, {
          categories: {
            needsAttn: 'Needs Attention',
            retest: 'Retest',
            complete: 'Complete'
          },
          mapMember: function(task) {
            return task.status;
          },
          columnMap: {
            'name': 'name',
            'owner': 'owner'
          },
          members: tasks
        }));
      }, this));
    }
  };
});