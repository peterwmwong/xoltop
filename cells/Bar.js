var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!SearchInput'], function(SearchInput) {
  return {
    init: function() {
      var _base, _base2, _ref, _ref2;
            if ((_ref = (_base = this.options).items) != null) {
        _ref;
      } else {
        _base.items = [];
      };
      return (_ref2 = (_base2 = this.options).selectedItem) != null ? _ref2 : _base2.selectedItem = this.options.items[0];
    },
    render: function(R) {
      return "<div id='xoltop'>\n  <div id='label'>XOLTOP</div>\n</div>\n" + (R(this.options.items, __bind(function(item, i) {
        return "  <div class='navItemContainer'>    <a href='#'       class='navItem " + (R(this.options.selectedItem === item && 'selected')) + "'       data-item='" + item + "'>" + (item.toUpperCase()) + "</a>  </div>";
      }, this))) + "\n" + (R.cell('SearchInput'));
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