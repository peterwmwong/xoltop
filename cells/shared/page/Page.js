var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['require', 'cell!./Nav'], function(require, Nav) {
  var defer;
  defer = function(f) {
    return setTimeout(f, 0);
  };
  return {
    init: function() {
      var _base, _base2, _ref, _ref2;
            if ((_ref = (_base = this.options).baseurl) != null) {
        _ref;
      } else {
        _base.baseurl = '';
      };
      return (_ref2 = (_base2 = this.options).selectedSection) != null ? _ref2 : _base2.selectedSection = this.options.sections[0];
    },
    loadSection: function(section) {
      var content;
      this.options.selectedSection = section.replace(' ', '-');
      content = this.$('> #content');
      content.html('');
      return require(["cell!" + this.options.baseurl + "/" + (section.toLowerCase()) + "/" + section + "Section"], __bind(function(NewSection) {
        if (this.options.selectedSection === section) {
          content.html('');
          return content.append(new NewSection().el);
        }
      }, this));
    },
    render: function(R) {
      defer(__bind(function() {
        return this.loadSection(this.options.selectedSection);
      }, this));
      return [
        R(Nav, {
          tabs: this.options.sections,
          selectedTab: this.options.selectedSection
        }), R('#content')
      ];
    },
    bind: {
      'changed :parent > .Nav': function(e, _arg) {
        var selectedTab;
        selectedTab = _arg.selectedTab;
        return this.loadSection(selectedTab);
      }
    }
  };
});