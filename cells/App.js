
define(['cell!shared/page/Page', 'cell!shared/ComingSoonPage', 'cell!pages/dashboard/DashboardPage', 'cell!Bar'], function(Page, ComingSoonPage, DashboardPage, Bar) {
  var pages;
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
    render: function(R, A) {
      var p;
      if ($.browser.msie) {
        return this.require('./IEGTFO', function(I) {
          return A([R(I)]);
        });
      } else {
        return [
          R(Bar, {
            selectedItem: this.options.selectedPage,
            items: (function() {
              var _results;
              _results = [];
              for (p in pages) {
                _results.push(p);
              }
              return _results;
            })()
          }), R('#content', this.getPage(this.options.selectedPage))
        ];
      }
    },
    on: {
      'selectedItemChanged :parent > .Bar': function(e, _arg) {
        var item;
        item = _arg.item;
        return this.$('> #content').html('').append(this.getPage(item));
      }
    },
    getPage: function(page) {
      var p;
      return (p = pages[page]) && (new p.cell(p.options)).el;
    }
  };
});
