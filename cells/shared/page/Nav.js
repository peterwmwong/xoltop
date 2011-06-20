var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define({
  init: function() {
    var _base, _ref;
    return (_ref = (_base = this.options).selectedTab) != null ? _ref : _base.selectedTab = this.options.tabs[0];
  },
  render: function(R) {
    return "" + (R.cell('SearchInput')) + "\n<ul>\n  " + (R(this.options.tabs, __bind(function(tab, i) {
      return "    <li " + (R(this.options.selectedTab === tab && "class='selected'")) + ">      <a href='#' id='" + tab + "'>" + tab + "</a><div class='triangle'></div>    </li>  ";
    }, this))) + "\n</ul>";
  },
  bind: {
    'click a': function(ev) {
      var target;
      this.$('.selected').removeClass('selected');
      $(target = ev.target).parent().addClass('selected');
      return $(this.el).trigger('changed', {
        selectedTab: (this.options.selectedTab = target.id)
      });
    }
  }
});