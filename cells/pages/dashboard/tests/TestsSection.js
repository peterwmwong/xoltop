var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!shared/cattable/CatTable'], function(S, CatTable) {
  return {
    render: function(R, A) {
      return S.dashboard.getStoryTestDetails(this.options.storynum, __bind(function(tests) {
        return A(__bind(function() {
          if ((tests != null ? tests.length : void 0) === 0) {
            return "<div class='notests'>No Tests</div>";
          } else {
            return R.cell(CatTable, {
              categories: {
                fail: 'Failing',
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
                  return "<a target='_blank' href='" + (S.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)) + "'>\n  " + id + "\n</a>";
                },
                name: function(_arg) {
                  var id, needsAttn, requirement, status;
                  id = _arg.id, status = _arg.status, needsAttn = _arg.needsAttn, requirement = _arg.requirement;
                  return "" + (R(needsAttn === true && "<span class='needsAttn'>NA</span>")) + "\n<a target='_blank' href='" + (S.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)) + "'>\n  " + requirement + "\n</a>";
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
            });
          }
        }, this)());
      }, this));
    }
  };
});