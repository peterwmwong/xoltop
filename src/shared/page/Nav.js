
define({
  init: function() {
    var _base, _ref;
    return (_ref = (_base = this.options).selectedTab) != null ? _ref : _base.selectedTab = this.options.tabs[0];
  },
  render: function(_) {
    var i, tab;
    return [
      _('ul', (function() {
        var _len, _ref, _results;
        _ref = this.options.tabs;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          tab = _ref[i];
          _results.push(_("li" + (this.options.selectedTab === tab && '.selected' || ''), _('a', {
            href: '#',
            id: tab
          }, tab), _('.triangle')));
        }
        return _results;
      }).call(this))
    ];
  },
  on: {
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
