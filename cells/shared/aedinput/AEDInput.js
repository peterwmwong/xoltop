define(function() {
  return {
    render: function(o) {
      return [
        o('.addButton', o('span.plus', '+'), 'Add Task'), o('input', {
          type: 'text',
          placeholder: this.options.placeholder || ''
        }), o('.deleteButton', o('span.trash', o('a')), o('span.label', 'Are you sure?'))
      ];
    },
    bind: {
      'click .deleteButton': function() {
        var $deleteButton, confirmed;
        $deleteButton = this.$('.deleteButton');
        confirmed = $deleteButton.hasClass('confirm');
        this.$('.deleteButton').toggleClass('confirm');
        if (confirmed) {
          return this.$el.trigger('delete');
        }
      },
      'mouseleave .deleteButton': function() {
        return this.$('.deleteButton').toggleClass('confirm', false);
      },
      'keyup input': function(_arg) {
        var blankOutInput, codeTaskText, target, which;
        which = _arg.which, target = _arg.target;
        blankOutInput = function() {
          target.attr('value', '');
          return target.blur();
        };
        switch (which) {
          case 27:
            return blankOutInput();
          case 13:
            target = $(target);
            codeTaskText = target.attr('value');
            return blankOutInput();
        }
      }
    }
  };
});