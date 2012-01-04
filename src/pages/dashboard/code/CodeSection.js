
define(['Services', 'cell!shared/cattable/CatTable', 'cell!shared/aedinput/AEDInput'], function(S, CatTable, AEDInput) {
  return {
    render: function(_) {
      var _this = this;
      return S.dashboard.getStoryCodeTasksDetails(this.options.storynum, function(codeTasks) {
        var storynum;
        _this.$el.append([
          (codeTasks != null ? codeTasks.length : void 0) === 0 ? _('div.nocodetasks', 'No Code Tasks') : (storynum = _this.options.storynum, _(CatTable, {
            categories: {
              notStarted: "Not Started",
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
                return _('a', {
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
        return _this.$el.trigger('loaded');
      });
    },
    on: {
      'click .CatTable .header > .plus': function() {
        return this.$('.CatTable > .category.notStarted > .members').prepend(new AEDInput().el);
      },
      'keyup .newCodeTask': function(_arg) {
        var blankOutInput, codeTaskText, target, which;
        which = _arg.which, target = _arg.target;
        blankOutInput = function() {
          target.attr('value', '');
          return target.blur();
        };
        switch (which) {
          case 27:
            return blankOutInput();
          case 13:
            target = $(target);
            codeTaskText = target.attr('value');
            return blankOutInput();
        }
      }
    }
  };
});
