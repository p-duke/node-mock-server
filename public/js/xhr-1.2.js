var xhr = (function() {
  var request = new (window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var initRequest = function(method, url) {
    var callbacks = {
      then: function() {},
      catch: function() {},
      always: function() {},
    };

    request.onload = function() {
      if (request.status >= 200 && request.status < 300) {
        callbacks.then.apply(null, parse(request));
      } else {
        callbacks.catch.apply(null, parse(request));
      }     
    };

    request.onerror = function() {
      callbacks.catch.apply(null, parse(request));
    };

    request.onloadend = function() {
      callbacks.always.apply(null, parse(request));
    };

    request.open(method, url);

    request.send();

    return {
      then: function(callback) {
        callbacks.then = callback;
        return this;
      },
      catch: function(callback) {
        callbacks.catch = callback;
        return this;
      },
      always: function(callback) {
        callbacks.always = callback;
        return this;
      }
    };
  };

  return initRequest;
})();

window.xhr = xhr;

