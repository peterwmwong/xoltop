
define({
  render: function() {
    return ["Loading"];
  },
  on: {
    enable: function() {
      return this.$el.toggleClass('enableLoading', true);
    },
    disable: function() {
      return this.$el.toggleClass('enableLoading', false);
    }
  }
});
