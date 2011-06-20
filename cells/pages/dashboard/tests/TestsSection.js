var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService', 'cell!shared/cattable/CatTable'], function(DashboardService, CatTable) {
  var defer;
  defer = function(f) {
    return setTimeout(f, 1000);
  };
  return {
    render: function(R, A) {
      return DashboardService.getStoryTestDetails(this.options.storynum, __bind(function(tests) {
        return A(R.cell(CatTable, {
          categories: {
            fail: 'Failing',
            towrite: 'To Write',
            pass: 'Passing'
          },
          mapMember: function(_arg) {
            var status;
            status = _arg.status;
            return status;
          },
          columnMap: {
            id: 'id',
            name: 'requirement',
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