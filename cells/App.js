var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['cell!shared/page/Page', 'cell!shared/ComingSoonPage', 'cell!pages/dashboard/DashboardPage', 'cell!Bar'], function(Page, ComingSoonPage, DashboardPage, Bar) {
  var defer, pages;
  defer = function(f) {
    return setTimeout(f, 0);
  };
  pages = {
    Dashboard: {
      cell: DashboardPage
    },
    Tests: {
      cell: Page,
      options: {
        baseurl: 'pages/tests',
        sections: ['Messy', 'Metrics'],
        selectedSection: 'Metrics'
      }
    },
    Stories: {
      cell: ComingSoonPage
    }
  };
  return {
    init: function() {
      var _base, _ref;
      return (_ref = (_base = this.options).selectedPage) != null ? _ref : _base.selectedPage = 'Dashboard';
    },
    render: function(R) {
      var p;
      defer(__bind(function() {
        return this.loadPage(this.options.selectedPage);
      }, this));
      return "" + (R.cell(Bar, {
        selectedItem: this.options.selectedPage,
        items: (function() {
          var _results;
          _results = [];
          for (p in pages) {
            _results.push(p);
          }
          return _results;
        })()
      })) + "\n<div id='content'></div>";
    },
    bind: {
      'selectedItemChanged :parent > .Bar': function(e, _arg) {
        var item;
        item = _arg.item;
        return this.loadPage(item);
      }
    },
    loadPage: function(page) {
      var content, p;
      content = this.$('> #content');
      content.html('');
      if (p = pages[page]) {
        return content.append(new p.cell(p.options || {}).el);
      }
    }
  };
});