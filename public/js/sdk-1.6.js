const factory = function factory(window) {
  const { document } = window;

  // WKND object uses this init constructor under the hood
  const WKND = function WKND(selector) {
    return new WKND.fn.Init(selector);
  };

  WKND.fn = {
    splice: [].splice
  };

  WKND.prototype = WKND.fn;

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
      this.each(function callback(item) {
        item.classList.add(className);
      });
      return this;
    },
    removeClass: function removeClass(className) {
      this.each(function callback(item) {
        item.classList.remove(className);
      });
      return this;
    },
    text: function text() {
      const resultString = [];
      for (let i = 0; i < this.length; i += 1) {
        resultString.push(this[i].textContent);
      }
      return resultString.join(' ');
    },
    attr: function attr(attrName, value = false) {
      if (!value) {
        return this[0].getAttribute(attrName) || '';
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].setAttribute(attrName, value);
      }

      return this;
    },
    hide: function hide() {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.display = 'none';
      }
    },
    show: function show() {
      for (let i = 0; i < this.length; i += 1) {
        const el = this[i];
        const { display } = el.style;

        if (display === 'none' || display === '') {
          el.style.display = 'block';
        }
      }
    }
  };

  // Initialize a WKND object
  /* eslint-disable func-names */
  WKND.fn.Init = function (selector) {
    this.length = 0;

    if (!selector) {
      return this;
    }

    let match = document.querySelectorAll(selector);

    if (match.length) {
      Array.prototype.push.call(this, ...match);
      this.length = match.length;
    }

    return this;
  };

  // Give the init function the WKND prototype for access to shared public methods
  WKND.fn.Init.prototype = { ...WKND.fn, ...publicMethods };

  /* eslint-disable no-param-reassign */
  window.wknd = WKND;

  return WKND;
};

const init = (window) => {
  factory(window);
};

const SDK = {
  init
};

SDK.init(window);

