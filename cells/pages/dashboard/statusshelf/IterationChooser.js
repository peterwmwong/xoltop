
if (typeof $ === "function") {
  $('head').append("<link href='http://fonts.googleapis.com/css?family=Nunito&v1' rel='stylesheet' type='text/css'>");
}

define({
  render: function(_) {
    return [
      _('.iterNum', _('a.prevIter', {
        href: '#'
      }, '<'), _('span.num', this.options.iterationNo), _('a.nextIter', {
        href: '#'
      }, '>')), _('.iterLabel', 'ITERATION')
    ];
  },
  on: (function() {
    var changeIter;
    changeIter = function(addAmt) {
      return function() {
        var newIter;
        if (0 < (newIter = this.options.iterationNo + addAmt)) {
          this.options.iterationNo = newIter;
          this.$('.num').html(this.options.iterationNo);
          return this.$el.trigger({
            type: 'iterationNoChanged',
            newIterationNo: this.options.iterationNo
          });
        }
      };
    };
    return {
      'click .prevIter': changeIter(-1),
      'click .nextIter': changeIter(1)
    };
  })()
});
