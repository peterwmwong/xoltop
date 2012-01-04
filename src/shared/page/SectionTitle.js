
define({
  render: function(R) {
    return [R('span#title', this.options.title), R('span#description', this.options.description)];
  }
});
