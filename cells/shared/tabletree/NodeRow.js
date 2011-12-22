
define(function() {
  var defer, renderChildren;
  defer = function(f) {
    return setTimeout(f, 0);
  };
  renderChildren = function(children) {
    var c, child, container, _i, _len;
    container = this.$('#children');
    container.html('');
    if ((children != null ? children.length : void 0) > 0) {
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        c = children[_i];
        child = new this.cell({
          "class": c.type,
          model: c,
          dataProviders: this.options.dataProviders
        });
        container.append(child.el);
      }
    } else if (this.options.noChildrenCell != null) {
      container.append(new this.options.noChildrenCell().el);
    }
  };
  return {
    init: function() {
      var dp, t;
      if (dp = this.options.dataProviders[this.model.type]) {
        this.options.nodeCell = dp.nodeCell;
        this.options.getChildren = dp.getChildren;
        this.options.noChildrenCell = dp.noChildrenCell;
      }
      this.options.rowClasses = ['Node'];
      if (t = this.model.type) return this.options.rowClasses.push(t);
    },
    render: function(_) {
      var _this = this;
      if (this.model.children instanceof Array) {
        defer(function() {
          return renderChildren.call(_this, _this.model.children);
        });
      }
      if (this.options.getChildren) {
        if (this.loadChildren == null) {
          this.loadChildren = function(reload) {
            delete _this.loadChildren;
            if (!_this.model.children || reload) {
              _this.model.children = _this.options.getChildren.call(_this.model, function(children) {
                if (!_this.model.children || reload) {
                  return renderChildren.call(_this, (_this.model.children = children));
                }
              });
              if (_this.model.children) {
                return renderChildren.call(_this, _this.model.children);
              }
            }
          };
        }
        if (this.model.expanded && !(this.model.children instanceof Array)) {
          setTimeout(this.loadChildren, 0);
        }
      }
      return [
        this.options.nodeCell ? _(this.options.nodeCell, {
          "class": this.options.rowClasses.join(' '),
          model: this.model
        }) : _('.' + this.options.rowClasses.join('.'), this.model.id), _('#children')
      ];
    },
    on: {
      'click .Node': function(_arg) {
        var target;
        target = _arg.target;
        if (!this.model.expanded) {
          if (typeof this.loadChildren === "function") this.loadChildren();
        }
        this.$('> #children').toggle(this.model.expanded = !this.model.expanded);
        this.$('> .Node').toggleClass('expanded', this.model.expanded);
        $(this.el).toggleClass('expanded', this.model.expanded);
        $(target).trigger('expanded', this.model.expanded);
        return false;
      }
    }
  };
});
