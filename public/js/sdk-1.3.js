(function(window, factory) {

  "use strict";

  factory(window);

})(typeof window !== "undefined" ? window : this, function(window) {

  "use strict";

  let match = [];
  const document = window.document;

  // WKND object uses this init constructor under the hood
  const WKND = function(selector) {
    return new WKND.fn.init(selector);
  };

  WKND.fn = WKND.prototype = {
    splice: match.splice,
  };

  const publicMethods = {
    each: function(callback) {
      if (!callback || typeof callback !== 'function')
        return;
      for (let i = 0; i < match.length; i++) {
        callback(match[i], i);
      }

      return this;

    },
    addClass: function(className) {
      publicMethods.each(function(item) {
        item.classList.add(className);
      });

      return this;

    },
    removeClass: function(className) {
      this.each(function (item) {
        item.classList.remove(className);
      });
      return this;
    },
  };

  // Initialize a WKND object
  const init = WKND.fn.init = function(selector) {
    match = document.querySelectorAll(selector);
    this.length = 0;

    if (match.length) {
      match.forEach((el,idx)=>{
        this[idx] = el;
        this.length += 1;
      });
    }

    return this;
  };

  // Give the init function the WKND prototype for access to shared proto methods
  init.prototype = Object.assign({}, WKND.fn, publicMethods);

  window.wknd = WKND;

  return WKND;
});

