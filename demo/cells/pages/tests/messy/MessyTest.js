define(function() {
  var Count;
  Count = cell.extend({
    'render <span>': function(R) {
      return [R('span.countGroup', this.options.red != null ? R('span.badge-red.count', this.options.red) : void 0, this.options.yellow != null ? R('span.badge-yellow.count', this.options.yellow) : void 0, !((this.options.red != null) || (this.options.yellow != null)) ? R("span.badge-" + (this.options.gray && 'green' || 'gray') + " count", this.options.gray) : void 0)];
    },
    bind: (function() {
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
    render: function(R) {
      return [
        R('#bar', R('#nav', R(Count, {
          id: 'issues',
          label: 'Issues',
          red: this.model.issuecount
        })), R('#expando'), R('span#testID.gray', R('a.name', {
          href: '#'
        }, this.model.testname)))
      ];
    }
  };
});