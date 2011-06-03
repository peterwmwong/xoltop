define({
  render: function(R) {
    return "" + (R(this.options.title && ("<div id='titlebar'>" + this.options.title + "</div>"))) + "\n<div id='rows' " + (this.options.title && ' ' || 'style="top: 0;"') + ">\n  <div id='headerrow'>\n    " + (R(this.options.cols, function(text) {
      return "<span class='headercol'>" + text + "</span>";
    })) + "\n  </div>\n  " + (R.cell('./NodeRow', {
      "class": 'ROOT',
      model: {
        type: '_',
        expanded: true
      },
      dataProviders: this.options.dataProviders
    })) + "\n</div>";
  }
});