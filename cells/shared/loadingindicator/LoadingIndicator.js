
define(['require'], function(require) {
  return {
    init: function() {
      if (this.options.enable === true) return this["class"] = 'enableLoading';
    },
    render: function(_) {
      return [_("<img class='loaderIcon' src='" + (require.toUrl('./ajax-loader.gif')) + "'/>"), 'Loading'];
    },
    on: {
      enable: function() {
        return this.$el.toggleClass('enableLoading', true);
      },
      disable: function() {
        return this.$el.toggleClass('enableLoading', false);
      }
    }
  };
});
