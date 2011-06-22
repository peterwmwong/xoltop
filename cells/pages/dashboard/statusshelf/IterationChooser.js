if (typeof $ === "function") {
  $('head').append("<link href='http://fonts.googleapis.com/css?family=Nunito&v1' rel='stylesheet' type='text/css'>");
}
define({
  render: function() {
    return "<div class='iterNum'>\n  <a href='#' class='prevIter'>&lt;</a>\n  <span class='num'>" + this.options.iterationNo + "</span>\n  <a href='#' class='nextIter'>&gt;</a>\n</div>\n<div class='iterLabel'>ITERATION</div>";
  },
  bind: (function() {
    var changeIter;
    changeIter = function(addAmt) {
      return function() {
        var newIter, _ref;
        if ((0 < (_ref = (newIter = this.options.iterationNo + addAmt)) && _ref < 237)) {
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