var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/cattable/CatTable'], function(S, CatTable) {
  return {
    render: function(R, A) {
      return S.dashboard.getStoryCodeTasksDetails(this.options.storynum, __bind(function(codeTasks) {
        return A(__bind(function() {
          var storynum;
          if ((codeTasks != null ? codeTasks.length : void 0) === 0) {
            return "<div class='nocodetasks'>No Code Tasks</div>";
          } else {
            storynum = this.options.storynum;
            return R.cell(CatTable, {
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
                  return "<a target='_blank' href='" + (S.getXPToolBaseUrl("xptool/projecttool/projecttool.tasklogtime.do?taskID=" + id + "&chumpStoryID=" + storynum)) + "'>\n  " + description + "\n</a>";
                },
                owner: function(_arg) {
                  var owner;
                  owner = _arg.task.owner;
                  return owner;
                }
              },
              members: codeTasks
            });
          }
        }, this)());
      }, this));
    }
  };
});