define({
  render: function() {
    return "Loading";
  },
  bind: {
    'enable': function() {
      return this.$el.toggleClass('enableLoading', true);
    },
    'disable': function() {
      return this.$el.toggleClass('enableLoading', false);
    }
  }
});