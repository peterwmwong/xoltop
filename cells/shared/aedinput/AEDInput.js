define(function() {
  return {
    render: function(o) {
      return [
        o('.label', this.options.label || ''), o('input.newCodeTask', {
          type: 'text',
          placeholder: this.options.placeholder || ''
        }), o('.addButton', o('span.plus', '+'), 'Add')
      ];
    }
  };
});