
define(function() {
  var Count;
  Count = cell.extend({
    tag: '<span>',
    render: function(_) {
      return [_('span.countGroup', this.options.red != null ? _('span.badge-red.count', this.options.red) : void 0, this.options.yellow != null ? _('span.badge-yellow.count', this.options.yellow) : void 0, !((this.options.red != null) || (this.options.yellow != null)) ? _("span.badge-" + (this.options.gray && 'green' || 'gray') + " count", this.options.gray) : void 0)];
    },
    on: (function() {
      var trigger;
      trigger = function() {
        $(this.el).trigger('selected');
        return false;
      };
      return {
        'click :parent > .item': trigger,
        'click :parent > .countGroup > .count': trigger
      };
    })()
  });
  return {
    init: function() {
      return this.model = this.model.data;
    },
    render: function(_) {
      return [
        _('#bar', _('#nav', _(Count, {
          id: 'issues',
          label: 'Issues',
          red: this.model.issuecount
        })), _('#expando'), _('span#testID.gray', _('a.name', {
          href: '#'
        }, this.model.testname)))
      ];
    }
  };
});
