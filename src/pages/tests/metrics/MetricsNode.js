
define(['cell!./CountBar'], function(CountBar) {
  var DefaultCountCol, DefaultNameCol;
  DefaultNameCol = cell.extend({
    tag: '<span>',
    render: function(_) {
      return [this.options.nameLabel, _('span.name', this.model.data.name)];
    }
  });
  DefaultCountCol = cell.extend({
    tag: '<span>',
    render: function(_) {
      var ats, cts, parent, parentAts, parentCts, _ref, _ref2;
      parent = this.model.parent;
      return [
        _('span.ats', _(CountBar, {
          model: {
            count: ats = this.model.ats || 0,
            pct: typeof (parentAts = (parent != null ? parent.ats : void 0) || (parent != null ? (_ref = parent.parent) != null ? _ref.ats : void 0 : void 0)) === 'number' ? ats / parentAts : 0
          }
        })), _('span.chumpTasks', _(CountBar, {
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
    render: function(_) {
      this.$el.toggleClass('expanded', !!this.model.expanded);
      return [
        _("<div id='expando' class='" + (this.model.expanded && 'expanded' || '') + "'>"), _(this.nameColCell, {
          "class": 'nameContainer',
          nameLabel: this.nameLabel,
          model: this.model
        }), _(this.countColCell, {
          "class": 'counts',
          model: this.model.data
        })
      ];
    },
    on: {
      expanded: function() {
        this.$el.toggleClass('expanded', this.model.expanded);
        this.$('#expando').toggleClass('expanded');
        return false;
      }
    }
  };
});
