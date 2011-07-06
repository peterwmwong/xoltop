var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(function() {
  var get, getXPToolBaseUrl, idFunc, jsonp, jsonpID, _ref, _ref2;
  idFunc = function(o) {
    return o;
  };
  jsonpID = 0;
  jsonp = function(options) {
    var jsonpString, s, _ref;
    jsonpString = '__jsonp' + ++jsonpID;
    window[jsonpString] = function(j) {
      options.success(j);
      window[jsonpString] = void 0;
      return $('#' + jsonpString).remove();
    };
        if ((_ref = options.callback) != null) {
      _ref;
    } else {
      options.callback = 'callback';
    };
    s = document.createElement('script');
    s.id = jsonpString;
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', "" + options.url + (options.url.indexOf('?') === -1 && '?' || '&') + options.callback + "=" + jsonpString);
    return $('head').append(s);
  };
  get = ((_ref = window.xoltop) != null ? (_ref2 = _ref.services) != null ? _ref2.useMockData : void 0 : void 0) ? function(_arg, done) {
    var mock;
    mock = _arg.mock;
    return setTimeout((function() {
      return require([mock], done);
    }), 500);
  } : function(_arg, done) {
    var real;
    real = _arg.real;
    return jsonp({
      callback: 'jsonp',
      url: real,
      success: done || function() {}
    });
  };
  return {
    getXPToolBaseUrl: getXPToolBaseUrl = function(relPath) {
      return "http://172.16.19.63:69/xptool/" + relPath;
    },
    JSONPService: (function() {
      function _Class(serviceName, _arg) {
        var baseURL, methods, name, pathFunc, process, _fn;
        baseURL = _arg.baseURL, process = _arg.process, methods = _arg.methods;
                if (process != null) {
          process;
        } else {
          process = idFunc;
        };
        _fn = __bind(function(name, pathFunc) {
          var cacheFunc, methodProcess, t;
          methodProcess = process;
          cacheFunc = idFunc;
          if ((t = typeof pathFunc) === 'object' && t !== 'function') {
            if (pathFunc.process != null) {
              methodProcess = pathFunc.process;
            }
            pathFunc = pathFunc.path;
            if (pathFunc.getCache != null) {
              cacheFunc = pathFunc.getCache;
            }
          }
          if (typeof pathFunc === 'string') {
            (function() {
              var p;
              p = pathFunc;
              return pathFunc = function() {
                return p;
              };
            })();
          }
          return this[name] = __bind(function() {
            var args, cacheValue, done, _i;
            args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), done = arguments[_i++];
            if (done == null) {
              done = idFunc;
            }
            if (cacheValue = cacheFunc()) {
              done(cacheValue);
            } else {
              get({
                mock: "data/mock/" + serviceName + "-" + name,
                real: baseURL + pathFunc.apply(null, args)
              }, function(rs) {
                rs = methodProcess(rs);
                return done(rs);
              });
            }
          }, this);
        }, this);
        for (name in methods) {
          pathFunc = methods[name];
          _fn(name, pathFunc);
        }
      }
      return _Class;
    })()
  };
});