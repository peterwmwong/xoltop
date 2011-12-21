
define(['require', 'cell!./Nav'], function(require, Nav) {
  var defer;
  defer = function(f) {
    return setTimeout(f, 0);
  };
  return {
    init: function() {
      var _base, _base2, _ref;
      if ((_base = this.options).baseurl == null) _base.baseurl = '';
      return (_ref = (_base2 = this.options).selectedSection) != null ? _ref : _base2.selectedSection = this.options.sections[0];
    },
    loadSection: function(section) {
      var content,
        _this = this;
      this.options.selectedSection = section.replace(' ', '-');
      content = this.$('> #content');
      content.html('');
      return require(["cell!" + this.options.baseurl + "/" + (section.toLowerCase()) + "/" + section + "Section"], function(NewSection) {
        if (_this.options.selectedSection === section) {
          content.html('');
          return content.append(new NewSection().el);
        }
      });
    },
    render: function(_) {
      var _this = this;
      defer(function() {
        return _this.loadSection(_this.options.selectedSection);
      });
      return [
        _(Nav, {
          tabs: this.options.sections,
          selectedTab: this.options.selectedSection
        }), _('#content')
      ];
    },
    on: {
      'changed :parent > .Nav': function(e, _arg) {
        var selectedTab;
        selectedTab = _arg.selectedTab;
        return this.loadSection(selectedTab);
      }
    }
  };
});
