define(['cell!./CountBar'], function(CountBar) {
  var DefaultCountCol, DefaultNameCol;
  DefaultNameCol = cell.extend({
    'render <span>': function() {
      return "" + (this.options.nameLabel || '') + "\n<span class='name'>" + (this.model.data.name || '') + "</span>";
    }
  });
  DefaultCountCol = cell.extend({
    'render <span>': function(R) {
      var ats, cts, parent, parentAts, parentCts, _ref, _ref2;
      parent = this.model.parent;
      return "<span class='ats'>" + (R.cell(CountBar, {
        model: {
          count: ats = this.model.ats || 0,
          pct: typeof (parentAts = (parent != null ? parent.ats : void 0) || (parent != null ? (_ref = parent.parent) != null ? _ref.ats : void 0 : void 0)) === 'number' ? ats / parentAts : 0
        }
      })) + "</span>\n<span class='chumpTasks'>" + (R.cell(CountBar, {
        model: {
          count: cts = this.model.chumpTasks || 0,
          pct: typeof (parentCts = (parent != null ? parent.chumpTasks : void 0) || (parent != null ? (_ref2 = parent.parent) != null ? _ref2.chumpTasks : void 0 : void 0)) === 'number' ? cts / parentCts : 0
        }
      })) + "</span>";
    }
  });
  return {
    countColCell: DefaultCountCol,
    nameColCell: DefaultNameCol,
    render: function(R) {
      this.$el.toggleClass('expanded', !!this.model.expanded);
      return "<div id='expando' " + (R(this.model.expanded && "class='expanded'")) + "></div>\n" + (R.cell(this.nameColCell, {
        "class": 'nameContainer',
        nameLabel: this.nameLabel,
        model: this.model
      })) + "\n" + (R.cell(this.countColCell, {
        "class": 'counts',
        model: this.model.data
      }));
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