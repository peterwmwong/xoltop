var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/cattable/CatTable', 'cell!shared/aedinput/AEDInput'], function(S, CatTable, AEDInput) {
  return {
    render: function(o, A) {
      return S.dashboard.getStoryCodeTasksDetails(this.options.storynum, __bind(function(codeTasks) {
        var storynum;
        return A([
          o('.addTask', o('.addButton', o('span.plus', '+'), 'Add Task'), o(AEDInput, {
            "class": 'codeTaskInput',
            placeholder: '... add a new code task',
            disableDelete: true
          })), (codeTasks != null ? codeTasks.length : void 0) === 0 ? o('div.nocodetasks', 'No Code Tasks') : (storynum = this.options.storynum, o(CatTable, {
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
                return o(AEDInput, {
                  value: description
                }, (function() {
                  /*
                                  o 'a',
                                    target: '_blank'
                                    href: S.getXPToolBaseUrl "xptool/projecttool/projecttool.tasklogtime.do?taskID=#{id}&chumpStoryID=#{storynum}"
                                    description
                                  */
                })());
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
      'delete .AEDInput': function() {}
    }
  };
});