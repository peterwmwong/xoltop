
define({
  render: function(R) {
    return "<div id='searchInputContainer'>\n  <input id='searchinput' type='text' placeholder='" + (R(this.options.placeholder || 'Search')) + "'></input>\n</div>\n<div id='searchIcon'>\n  <div id='circle'></div>\n  <div id='rect'></div>\n</div>";
  }
});
