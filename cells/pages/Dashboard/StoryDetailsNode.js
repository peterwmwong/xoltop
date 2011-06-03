efine(['cell!./TestDetails', 'cell!./TaskDetails'], function(TestDetails, TaskDetails) {
  return {
    render: function(R) {
      console.log('StoryDetailsNode');
      return "<div class='StoryDetails'>\n  Description blah blah blah\n</div>\n" + (R(TestDetails, {
        model: this.model
      })) + "\n" + (R(TaskDetails, {
        model: this.model
      }));
    },
    bind: {
      changeDetails: function() {
        console.log('change details');
        return false;
      }
    }
  };
});