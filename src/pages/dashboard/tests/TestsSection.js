
define(['Services', 'cell!shared/cattable/CatTable'], function(S, CatTable) {
  return {
    render: function(_) {
      var _this = this;
      return S.dashboard.getStoryTestDetails(this.options.storynum, function(tests) {
        _this.$el.append([
          (tests != null ? tests.length : void 0) === 0 ? _('.notests', 'No Tests') : _(CatTable, {
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
                return _('a', {
                  target: '_blank',
                  href: S.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)
                }, id);
              },
              name: function(_arg) {
                var id, needsAttn, requirement, status;
                id = _arg.id, status = _arg.status, needsAttn = _arg.needsAttn, requirement = _arg.requirement;
                return [
                  needsAttn ? _('span.needsAttn', 'NA') : void 0, _('a', {
                    target: '_blank',
                    href: S.getXPToolBaseUrl("xp.testnoteview.do?testNumber=" + id)
                  }, requirement)
                ];
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
          })
        ]);
        _this.loaded = true;
        return _this.$el.trigger('loaded');
      });
    }
  };
});
