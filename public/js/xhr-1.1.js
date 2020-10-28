'use strict';

var xhr = (function (window) {
  var exports = {};

  var init = function (type, url, data) {
    var methods = {
      success: function () {},
      error: function () {},
      always: function () {}
    };

    var XHR = window.XMLHttpRequest || ActiveXObject;

    var request = new XHR('MSXML2.XMLHTTP.3.0');

    var parse = function (req) {
      var result;
      try {
        result = JSON.parse(req.responseText);
      } catch (e) {
        result = req.responseText;
      }
      return [result, req];
    };

    request.open(type, url, true);
    // request.setRequestHeader('Content-type', config.contentType);
    request.onreadystatechange = function () {
      var req;
      if (request.readyState === 4) {
        req = parse(request);
        if (request.status >= 200 && request.status < 300) {
          methods.success.apply(methods, req);
        } else {
          methods.error.apply(methods, req);
        }
        methods.always.apply(methods, req);
      }
    };
    request.send(data);

    var atomXHR = {
      success: function (callback) {
        methods.success = callback;
        return atomXHR;
      },
      error: function (callback) {
        methods.error = callback;
        return atomXHR;
      },
      always: function (callback) {
        methods.always = callback;
        return atomXHR;
      }
    };

    return atomXHR;
  };

  exports.get = function (src) {
    return init('GET', src);
  };

  return exports;
})(window);

