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
      return this[index];
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
  const init = WKND.fn.Init = function (selector, WKND) {
    this.length = 0;

    if (!selector) return this;

    if (selector) {
      match = document.querySelectorAll(selector);
      match.forEach((el, idx) => {
        this[idx] = el;
        this.length += 1;
      });
    }

    if (WKND) {

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

