define(function() {
  var Count;
  Count = cell.extend({
    'render <span>': function(R) {
      return "<span class='countGroup'>\n  " + (R((this.options.red != null) && ("    <span class='badge-red count'>" + this.options.red + "</span>  "))) + "\n  " + (R((this.options.yellow != null) && ("    <span class='badge-yellow count'>" + this.options.yellow + "</span>  "))) + "\n  " + (R(!((this.options.red != null) || (this.options.yellow != null)) && ("    <span class='badge-" + (this.options.gray && 'green' || 'gray') + " count'>" + this.options.gray + "</span>  "))) + "\n</span>";
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
      return "<div id='bar'>\n  <span id='nav'>\n    " + (R.cell(Count, {
        id: 'issues',
        label: 'Issues',
        red: this.model.issuecount
      })) + " \n  </span>\n  <div id='expando'></div>\n  <span id='testID' class='gray'>\n    <a class='name' href=\"#\">\n      " + this.model.testname + "\n    </a>\n  </span>\n</div>";
    }
  };
});