var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(function() {
  var defer, renderChildren;
  defer = function(f) {
    return setTimeout(f, t);
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
      var dp;
      if (dp = this.options.dataProviders[this.model.type]) {
        this.options.nodeCell = dp.nodeCell;
        this.options.getChildren = dp.getChildren;
        this.options.noChildrenCell = dp.noChildrenCell;
      }
      return this.options.rowClass = "Node" + (' ' + this.model.type || '');
    },
    render: function(R) {
      var _ref;
      if (this.model.children instanceof Array) {
        defer(__bind(function() {
          return renderChildren.call(this, this.model.children);
        }, this));
      }
      if (this.options.getChildren) {
                if ((_ref = this.loadChildren) != null) {
          _ref;
        } else {
          this.loadChildren = __bind(function(reload) {
            delete this.loadChildren;
            if (!this.model.children || reload) {
              this.model.children = this.options.getChildren.call(this.model, __bind(function(children) {
                if (!this.model.children || reload) {
                  return renderChildren.call(this, (this.model.children = children));
                }
              }, this));
              if (this.model.children) {
                return renderChildren.call(this, this.model.children);
              }
            }
          }, this);
        };
        if (this.model.expanded && !(this.model.children instanceof Array)) {
          setTimeout(this.loadChildren, 0);
        }
      }
      return "" + (this.options.nodeCell ? R.cell(this.options.nodeCell, {
        "class": this.options.rowClass,
        model: this.model
      }) : "<div class='" + this.options.rowClass + "'>" + (this.model.id || '') + "</div>") + "     <div id='children'></div>";
    },
    bind: {
      'click .Node': function(_arg) {
        var target;
        target = _arg.target;
        if (!this.model.expanded) {
          if (typeof this.loadChildren === "function") {
            this.loadChildren();
          }
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