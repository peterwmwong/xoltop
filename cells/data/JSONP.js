var __slice = Array.prototype.slice;
define(function() {
  var TESTING, jsonp, jsonpID, _ref, _ref2;
  TESTING = (_ref = window.xoltop) != null ? (_ref2 = _ref.services) != null ? _ref2.useMockData : void 0 : void 0;
  jsonpID = 0;
  jsonp = function(options) {
    var jsonpString, s, _ref3;
    jsonpString = '__jsonp' + ++jsonpID;
    window[jsonpString] = function(j) {
      options.success(j);
      window[jsonpString] = void 0;
      return $('#' + jsonpString).remove();
    };
        if ((_ref3 = options.callback) != null) {
      _ref3;
    } else {
      options.callback = 'callback';
    };
    s = document.createElement('script');
    s.id = jsonpString;
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', "" + options.url + (options.url.indexOf('?') === -1 && '?' || '&') + options.callback + "=" + jsonpString);
    return $('head').append(s);
  };
  /*
    Creates a builder function for creating Service methods
    ex. A Service that gets todos could use this method as
        follows:
  
      Service = do->
        get = jsonp.makeget 'http://serverservice/root/'
  
        getTodos: get 'todos'
        getTodo:  get (todoid)-> "todos/#{todoid}"
  
      Service.getTodos (todos)-> # do stuff with todos
      Service.getTodo 1234, (todo)-> # do stuff with todo #1234
    */
  jsonp.makeget = function(baseurl, _arg) {
    var callback, process;
    callback = _arg.callback, process = _arg.process;
        if (callback != null) {
      callback;
    } else {
      callback = 'callback';
    };
        if (process != null) {
      process;
    } else {
      process = function(result) {
        return result;
      };
    };
    return function(pathFunc) {
      var path;
      if (typeof pathFunc === 'string') {
        path = pathFunc;
        pathFunc = function() {
          return path;
        };
      }
      return function() {
        var args, done, _i;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
        jsonp({
          callback: callback,
          url: "" + baseurl + (pathFunc.apply(null, args)),
          success: function(dataArray) {
            return typeof done === "function" ? done(process(dataArray)) : void 0;
          }
        });
      };
    };
  };
  jsonp.get = (function() {
    var defer;
    defer = function(f) {
      return setTimeout(f, 0);
    };
    return function(_arg, done) {
      var mock, real;
      mock = _arg.mock, real = _arg.real;
      if (TESTING) {
        defer(function() {
          return require([mock], done);
        });
      } else {
        jsonp({
          callback: 'jsonp',
          url: real,
          success: done || function() {}
        });
      }
    };
  })();
  jsonp.getXPToolBaseUrl = function(relPath) {
    return "http://172.16.19.63:69/xptool/" + relPath;
  };
  jsonp.serviceurl = function(path) {
    return jsonp.getXPToolBaseUrl("rest/jumbotron/" + path);
  };
  return jsonp;
});