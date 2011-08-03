define(['cell!./CountBar'], function(CountBar) {
  var DefaultCountCol, DefaultNameCol;
  DefaultNameCol = cell.extend({
    'render <span>': function(R) {
      return [this.options.nameLabel, R('span.name', this.model.data.name)];
    }
  });
  DefaultCountCol = cell.extend({
    'render <span>': function(R) {
      var ats, cts, parent, parentAts, parentCts, _ref, _ref2;
      parent = this.model.parent;
      return [
        R('span.ats', R(CountBar, {
          model: {
            count: ats = this.model.ats || 0,
            pct: typeof (parentAts = (parent != null ? parent.ats : void 0) || (parent != null ? (_ref = parent.parent) != null ? _ref.ats : void 0 : void 0)) === 'number' ? ats / parentAts : 0
          }
        })), R('span.chumpTasks', R(CountBar, {
          model: {
            count: cts = this.model.chumpTasks || 0,
            pct: typeof (parentCts = (parent != null ? parent.chumpTasks : void 0) || (parent != null ? (_ref2 = parent.parent) != null ? _ref2.chumpTasks : void 0 : void 0)) === 'number' ? cts / parentCts : 0
          }
        }))
      ];
    }
  });
  return {
    countColCell: DefaultCountCol,
    nameColCell: DefaultNameCol,
    render: function(R) {
      this.$el.toggleClass('expanded', !!this.model.expanded);
      return [
        R('#expando', this.model.expanded ? {
          "class": 'expanded'
        } : void 0), R(this.nameColCell, {
          "class": 'nameContainer',
          nameLabel: this.nameLabel,
          model: this.model
        }), R(this.countColCell, {
          "class": 'counts',
          model: this.model.data
        })
      ];
    },
    bind: {
      expanded: function() {
        this.$el.toggleClass('expanded', this.model.expanded);
        this.$('#expando').toggleClass('expanded');
        return false;
      }
    }
  };
});