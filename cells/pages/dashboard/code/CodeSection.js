var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/cattable/CatTable'], function(S, CatTable) {
  return {
    render: function(R, A) {
      return S.dashboard.getStoryCodeTasksDetails(this.options.storynum, __bind(function(codeTasks) {
        var storynum;
        return A([
          R('.newCodeTaskContainer', R('input.newCodeTask', {
            type: 'text',
            placeholder: '+  Add a code task'
          }), R('.addButton', R('span.plus', '+'), 'Add')), (codeTasks != null ? codeTasks.length : void 0) === 0 ? R('div.nocodetasks', 'No Code Tasks') : (storynum = this.options.storynum, R(CatTable, {
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
                return R('a', {
                  target: '_blank',
                  href: S.getXPToolBaseUrl("xptool/projecttool/projecttool.tasklogtime.do?taskID=" + id + "&chumpStoryID=" + storynum)
                }, description);
              },
              owner: function(_arg) {
                var owner;
                owner = _arg.task.owner;
                return owner;
              }
            },
            members: codeTasks
          }))
        ]);
      }, this));
    },
    bind: {
      'keyup .newCodeTask': function(_arg) {
        var codeTaskText, target, which;
        which = _arg.which, target = _arg.target;
        if (which === 13) {
          target = $(target);
          codeTaskText = target.attr('value');
          target.attr('value', '');
          return target.blur();
        }
      }
    }
  };
});