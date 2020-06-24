var factory = function (window) {
  "use strict";
  var match;
  var arr = [];
  var document = window.document;
  var WKND = function (selector) {
    if (WKND.fn.init !== undefined) {
      return (new WKND.fn.init(selector));
    }
  };
  WKND.fn = WKND.prototype = {
    splice: arr.splice,
  };
  // Initialize a WKND object
  var init = (WKND.fn.init = function (selector) {
    var _this = this;
    match = document.querySelectorAll(selector);
    this.length = 0;
    if (match.length) {
      match.forEach(function (el, idx) {
        if (_this.length !== undefined) {
          _this[idx] = el;
          _this.length += 1;
        }
      });
    }
    return this;
  });
  // Methods that every instance will have access to via delegation on the WKND prototype chain
  var baseMethods = {
    each: function (callback) {
      if (!callback || typeof callback !== 'function') {
        return;
      }
      for (var i = 0; i < match.length; i++) {
        callback(match[i], i);
      }
      return this;
    },
    addClass: function (className) {
      baseMethods.each(function (item) {
        item.classList.add(className);
      });
      return this;
    },
    removeClass: function (className) {
      baseMethods.each(function (item) {
        item.classList.remove(className);
      });
      return this;
    }
  };
  // Add the WKND object and the base methods to the prototype chain
  init.prototype = Object.assign({}, WKND.fn, baseMethods);
  window.wknd = WKND;
  return WKND;
};
(function (window, factory) {
  "use strict";
  factory(window);
})(window, factory);

