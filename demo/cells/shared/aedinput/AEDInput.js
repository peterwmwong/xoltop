define(function() {
  return {
    render: function(o) {
      return [
        o('.addButton', o('span.plus', '+'), 'Add Task'), o('input.newCodeTask', {
          type: 'text',
          placeholder: this.options.placeholder || ''
        })
      ];
    }
  };
});