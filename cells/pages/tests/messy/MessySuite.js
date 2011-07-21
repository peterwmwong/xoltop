define(function() {
  var Count, getPkgName;
  Count = cell.extend({
    'render <span>': function(R) {
      return [R('span.countGroup'), this.options.red != null ? R('span.badge-red.count', this.options.red) : void 0, this.options.yellow != null ? R('span.badge-yellow.count', this.options.yellow) : void 0, (this.options.red != null) || (this.options.yellow != null) ? R("span.count.badge-" + (this.options.gray && 'green' || 'gray'), this.options.gray) : void 0];
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
      return [
        R('#bar', R('#expando'), R('span#suiteName.gray', R('span#package', pkgName.pkg), R('a.name', {
          href: '#'
        }, ' ' + pkgName.name)))
      ];
    }
  };
});