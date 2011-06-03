define(function() {
  var Count, getPkgName;
  Count = cell.extend({
    'render <span>': function(R) {
      return "<span class='countGroup'>\n  " + (R((this.options.red != null) && ("    <span class='badge-red count'>" + this.options.red + "</span>  "))) + "\n  " + (R((this.options.yellow != null) && ("    <span class='badge-yellow count'>" + this.options.yellow + "</span>  "))) + "\n  " + (R(!((this.options.red != null) || (this.options.yellow != null)) && ("    <span class='badge-" + (this.options.gray && 'green' || 'gray') + " count'>" + this.options.gray + "</span>  "))) + "\n</span>";
    },
    bind: (function() {
      var trigger;
      trigger = function() {
        $(this.el).trigger('selected');
        return false;
      };
      return {
        'click :parent > .item': trigger,
        'click :parent > .countGroup > .count': trigger
      };
    })()
  });
  getPkgName = (function() {
    var suiteRegex;
    suiteRegex = /([^\.]*)\.([^\.]*)$/;
    return function(name) {
      var match;
      match = suiteRegex.exec(name);
      return {
        pkg: match[1],
        name: match[2]
      };
    };
  })();
  return {
    init: function() {
      return this.model = this.model.data;
    },
    render: function(R) {
      var pkgName;
      pkgName = getPkgName(this.model.suitename);
      return "<div id='bar'>\n  <div id='expando'></div>\n  <span id='suiteName' class='gray'>\n    <span id='package'>" + pkgName.pkg + "</span>\n    <a class='name' href=\"#\">\n      " + pkgName.name + "\n    </a>\n  </span>\n</div>";
    }
  };
});