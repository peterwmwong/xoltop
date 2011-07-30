define(['Services', 'cell!signin/SignIn'], function(S, SignIn) {
  $('<link  href="http://fonts.googleapis.com/css?family=Maven+Pro:700&v1" rel="stylesheet" type="text/css" >').appendTo('head');
  return {
    render: function(R) {
      var i, item;
      return [
        R('#xoltop', 'XOLTOP'), (function() {
          var _len, _ref, _results;
          _ref = this.options.items;
          _results = [];
          for (i = 0, _len = _ref.length; i < _len; i++) {
            item = _ref[i];
            _results.push(R('span.navItemContainer', $("<a class='navItem " + (i === 0 && 'selected' || '') + "' data-item='" + item + "'>" + (item.toUpperCase()) + "</a>")[0]));
          }
          return _results;
        }).call(this), R(SignIn)
      ];
    },
    bind: {
      'click .navItem': function(ev) {
        var target;
        this.$('.navItem.selected').removeClass('selected');
        (target = $(ev.target)).addClass('selected');
        return $(this.el).trigger('selectedItemChanged', {
          item: target.attr('data-item')
        });
      }
    }
  };
});