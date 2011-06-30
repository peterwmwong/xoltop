var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!SignIn'], function(S, SignIn) {
  return {
    render: function(R) {
      return "<span id='xoltop'>XOLTOP</span>\n" + (R(this.options.items, __bind(function(item, i) {
        return "  <span class='navItemContainer'>    <a href='#'       class='navItem " + (R(i === 0 && 'selected')) + "'       data-item='" + item + "'>" + (item.toUpperCase()) + "</a>  </span>";
      }, this))) + "\n" + (R.cell(SignIn)) + " ";
    },
    bind: {
      'click .navItem': function(ev) {
        var target;
        this.$('.navItem.selected').removeClass('selected');
        (target = $(ev.target)).addClass('selected');
        return $(this.el).trigger('selectedItemChanged', {
          item: $(target).attr('data-item')
        });
      }
    }
  };
});