define({
  init: function() {
    var k, v;
    this._categoryNames = (function() {
      var _len, _ref, _results;
      _ref = this.config.categories;
      _results = [];
      for (v = 0, _len = _ref.length; v < _len; v++) {
        k = _ref[v];
        _results.push(k);
      }
      return _results;
    }).call(this);
    return this._columnNames = (function() {
      var _len, _ref, _results;
      _ref = this.config.columns;
      _results = [];
      for (v = 0, _len = _ref.length; v < _len; v++) {
        k = _ref[v];
        _results.push(k);
      }
      return _results;
    }).call(this);
  },
  render: function(R) {
    var numRenderedGroups, oddEven;
    numRenderedGroups = 0;
    oddEven = (function() {
      var isEven;
      isEven = false;
      return function() {
        return (isEven = !isEven) && 'even' || 'odd';
      };
    })();
    return "<table>\n  <tbody>\n    " + (R(this._categoryNames, function(status, cat) {
      var catMembers, category;
      catMembers = this.config.getMembers(cat, this.model);
      category = this.config.categories[cat];
      return R((catMembers != null ? catMembers.length : void 0) > 0 && ("          " + (R(numRenderedGroups++ > 0 && "            <tr class='categorySpacer'><td colspan='6'> </td></tr>")) + "          " + (R(catMembers, function(c, i) {
        return "            <tr class='" + (R(i === 0 && 'category ')) + (oddEven()) + "'>              " + (R(i === 0 && ("                <td rowspan='" + (this.config.columns || 0) + "' id='header' class='" + cat + "'>                  " + category + "                </td>              ") || R(this._columnNames, function(col) {
          return "<td id='" + col + "'>" + (this.config.getColumn(c != null ? c[col] : void 0, c, this.model)) + "</td>";
        }))) + "            </tr>          ";
      })) + "    "));
    }));
  }
});