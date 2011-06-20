define({
  render: function() {
    return "    <span id='count'>" + (this.model.count || '') + "</span>    " + (this.hideBar ? "" : "      <span id='barContainer'>        <div id='bar' style='width:" + (Math.min(100, this.model.pct * 100)) + "%;'>&nbsp;</div>      </span>    ") + "  ";
  }
});