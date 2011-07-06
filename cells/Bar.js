var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['Services', 'cell!signin/SignIn'], function(S, SignIn) {
  $('<link  href="http://fonts.googleapis.com/css?family=Maven+Pro:400,500,700,900&v1" rel="stylesheet" type="text/css" >').appendTo('head');
  return {
    render: function(R) {
      return "<div id='xoltop'>XOLTOP</div>\n" + (R(this.options.items, __bind(function(item, i) {
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