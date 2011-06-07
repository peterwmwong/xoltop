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
            failing: 'Failing',
            towrite: 'To Write',
            passing: 'Passing'
          },
          mapMember: function(_arg) {
            var category;
            category = _arg.category;
            return category;
          },
          columnMap: {
            id: 'id',
            name: 'name',
            status: function(_arg) {
              var update;
              update = _arg.update;
              return update.status;
            },
            date: function(_arg) {
              var d, isToday, _ref;
              _ref = _arg.update, d = _ref.date, isToday = _ref.isToday;
              if (isToday) {
                return 'Today';
              } else {
                return "" + (d.getMonth() + 1) + "/" + (d.getDate()) + "/" + (d.getFullYear());
              }
            },
            owner: function(_arg) {
              var update;
              update = _arg.update;
              return update.owner;
            }
          },
          members: tests
        }));
      }, this));
    }
  };
});