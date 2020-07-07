const factory = function factory(window) {
  const document = window.document;

  // WKND object uses this init constructor under the hood
  const WKND = function WKND(selector) {
    return new WKND.fn.Init(selector);
  };

  WKND.fn = {
    splice: [].splice,
    constructor: WKND,
    pushStack: function(elements) {
      let result = WKND.fn.extend(this.constructor(), elements);

      result.prevObject = this;

      return result;
    },
    extend: function() {
      let newObj = {};
      const merge = function(obj) {
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
          }
        }
      };

      for (let i = 0; i < arguments.length; i += 1) {
        merge(arguments[i]);
      }

      return newObj;
    },
  };

  WKND.prototype = Array.prototype;

  const publicMethods = {
    each: function each(callback) {
      if (!callback || typeof callback !== 'function') {
        return this;
      }

      for (let i = 0; i < this.length; i += 1) {
        callback(this[i], i);
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
    },
    find: function find(selector) {
      let results = [];
      for (let i = 0; i < match.length; i += 1) {
        results.push(...match[i].querySelectorAll(selector));
      }
      match = results;
      return match;
    },
    text: function text() {
      let resultString = [];
      for (let i = 0; i < match.length; i += 1) {
        resultString.push(match[i].textContent);
      }
      return resultString.join(' ');
    },
    attr: function attr(attrName, value = false) {
      if (!value) {
        return match[0].getAttribute(attrName);
      }

      for (let i = 0; i < match.length; i += 1) {
        match[i].setAttribute(attrName, value);
      }

      return this;
    },
    eq: function eq(index) {
      return this.pushStack(match[index]);
    },
    hide: function hide() {
      for (let i = 0; i < match.length; i += 1) {
        match[i].style.display = 'none';
      }
    },
    show: function show() {
      for (let i = 0; i < match.length; i += 1) {
        match[i].style.display = '';
      }
    },
  };

  // Initialize a WKND object
  const init = WKND.fn.Init = function (selector) {
    this.length = 0;

    if (!selector) return this;

    if (selector) {
      let match = document.querySelectorAll(selector);
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

