var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  return {
    render: function(R, A) {
      return DashboardService.getStoryTestDetails(this.options.storynum, __bind(function(tests) {
        return A(R.cell(CatTable, {
          categories: {
            fail: 'Failing / NA',
            towrite: 'To Write',
            pass: 'Passing'
          },
          mapMember: function(_arg) {
            var status;
            status = _arg.status;
            return status === 'na' && 'fail' || status;
          },
          columnMap: {
            id: function(_arg) {
              var id;
              id = _arg.id;
              return "<a target='_blank' href='" + (DashboardService.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)) + "'>\n  " + id + "\n</a>";
            },
            name: function(_arg) {
              var id, requirement, status;
              id = _arg.id, status = _arg.status, requirement = _arg.requirement;
              return "" + (R(status === 'na' && "<span class='needsAttn'>NA</span>")) + "\n<a target='_blank' href='" + (DashboardService.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)) + "'>\n  " + requirement + "\n</a>";
            },
            status: function(_arg) {
              var update;
              update = _arg.update;
              return update.status || '';
            },
            date: function(_arg) {
              var date, isToday, _ref;
              _ref = _arg.update, date = _ref.date, isToday = _ref.isToday;
              if (isToday) {
                return 'Today';
              } else if (date) {
                return "" + (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());
              } else {
                return '';
              }
            },
            owner: function(_arg) {
              var owner;
              owner = _arg.update.owner;
              return owner;
            }
          },
          members: tests
        }));
      }, this));
    }
  };
});