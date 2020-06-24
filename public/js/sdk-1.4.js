const factory = function factory(window) {
  let match = [];
  const document = window.document;

  // WKND object uses this init constructor under the hood
  const WKND = function WKND(selector) {
    return new WKND.fn.Init(selector);
  };

  WKND.fn = {
    splice: match.splice
  };

  WKND.prototype = WKND.fn;

  const publicMethods = {
    each: function each(callback) {
      if (!callback || typeof callback !== 'function') {
        return this;
      }

      for (let i = 0; i < match.length; i += 1) {
        callback(match[i], i);
      }

      return this;
    },
    addClass: function addClass(className) {
      publicMethods.each(function callback(item) {
        item.classList.add(className);
      });
      return this;
    },
    removeClass: function removeClass(className) {
      publicMethods.each(function callback(item) {
        item.classList.remove(className);
      });
      return this;
    }
  };

  // Initialize a WKND object
  WKND.fn.Init = function (selector) {
    this.length = 0;

    if (!selector) return this;

    match = document.querySelectorAll(selector);
    if (match.length) {
      match.forEach((el, idx) => {
        this[idx] = el;
        this.length += 1;
      });
    }

    return this;
  };

  // Give the init function the WKND prototype for access to shared public methods
  WKND.fn.Init.prototype = { ...WKND.fn, ...publicMethods };

  /* eslint-disable no-param-reassign */
  window.wknd = WKND;

  return WKND;
};

(function (window, initializeWKND) {
  initializeWKND(window);
}(window, factory));

