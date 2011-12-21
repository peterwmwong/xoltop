
define({
  render: function(R) {
    return [R('span#count', this.model.count), !this.hideBar ? R('span#barContainer', $("<div id=bar style='width:" + (Math.min(100, this.model.pct * 100)) + "%;'></div>")[0]) : void 0];
  }
});
