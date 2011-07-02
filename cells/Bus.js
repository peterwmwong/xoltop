define(function() {
  var bus;
  bus = $(document.createElement('div'));
  return {
    trigger: function(ev) {
      return bus.trigger(ev);
    },
    one: function(type, cb) {
      return bus.one(type, cb);
    },
    bind: function(type, cb) {
      return bus.bind(type, cb);
    },
    unbind: function(type, cb) {
      if (typeof cb === 'function') {
        return bus.unbind(type, cb);
      }
    }
  };
});