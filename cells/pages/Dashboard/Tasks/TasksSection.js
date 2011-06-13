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
          mapMember: function(_arg) {
            var task;
            task = _arg.task;
            return task.category;
          },
          columnMap: {
            note: function(_arg) {
              var task;
              task = _arg.task;
              return task.note;
            },
            showMoreLess: function() {
              return "<a class='more'>More</a><a class='less'>Less</a>";
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
      },
      'click .column.showMoreLess > a': function(ev) {
        var $target;
        $target = $(ev.target);
        $target.parent().toggleClass('showLess');
        return $('.column.note', $target.closest('tr')).toggleClass('expanded');
      }
    }
  };
});