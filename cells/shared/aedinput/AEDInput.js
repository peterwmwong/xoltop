
define(function() {
  return {
    render: function(_) {
      return [
        _('.inputGroup', _('input', {
          type: 'text',
          placeholder: this.options.placeholder || '',
          value: this.options.value || ''
        }), _('.saveButtonMask', {
          "class": 'save'
        }, _('.saveButton', _('span.savingIcon'), _('span.label-saving', 'Saving'), _('span.label-save', 'Save')))), this.options.disableDelete !== true ? _('.deleteButton', _('a.trash', _('a')), _('span.label', 'Are you sure?')) : void 0
      ];
    },
    on: {
      'click .deleteButton': function() {
        var $deleteButton, confirmed;
        $deleteButton = this.$('.deleteButton');
        confirmed = $deleteButton.hasClass('confirm');
        this.$('.deleteButton').toggleClass('confirm');
        if (confirmed) return this.$el.trigger('delete');
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
