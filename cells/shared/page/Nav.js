define({
  init: function() {
    var _base, _ref;
    return (_ref = (_base = this.options).selectedTab) != null ? _ref : _base.selectedTab = this.options.tabs[0];
  },
  render: function(R) {
    var i, tab;
    return [
      R('ul', (function() {
        var _len, _ref, _results;
        _ref = this.options.tabs;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          tab = _ref[i];
          _results.push(R("li" + (this.options.selectedTab === tab && '.selected' || ''), R('a', {
            href: '#',
            id: tab
          }, tab), R('.triangle')));
        }
        return _results;
      }).call(this))
    ];
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