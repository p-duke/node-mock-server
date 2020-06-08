const wknd = (function (window, document, undefined) {
  'use strict';

  /**
   * Create the constructor
   * @param {String} selector The selector to use
   */
  function WKND(selector) {
    if (!selector) return;
    if (selector === 'document') {
      this.push([window]);
    } else if (selector === 'window') {
      this.push([window]);
    } else {
      const match = document.querySelectorAll(selector);
      if (match.length) {
        match.forEach((el) => {
          this.push(el);
        })
      }    
    }
  };

  /**
   * This allows us to have an array-like object just like
   * By assigning the underlying prototype as an array we can return an 
   * array-like object in the same fashion as jQuery:
   * w.fn.init [body, prevObject: w.fn.init(1)]
   */
  WKND.prototype = [];

  /**
   * Run a callback on each item
   * @param  {Function} callback The callback function to run
   */
  WKND.prototype.each = function (callback) {
    if (!callback || typeof callback !== 'function') return;
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i);
    }
    return this;
  };

  /**
   * Add a class to elements
   * @param {String} className The class name
   */
  WKND.prototype.addClass = function (className) {
    this.each(function (item) {
      item.classList.add(className);
    });
    return this;
  };

  /**
   * Remove a class to elements
   * @param {String} className The class name
   */
  WKND.prototype.removeClass = function (className) {
    this.each(function (item) {
      item.classList.remove(className);
    });
    return this;
  };

  /**
   * Instantiate a new constructor
   */
  const init = function (selector) {
    return new WKND(selector);
  };

  /**
   * Return the constructor instantiation
   */
  return init;

})(window, document);

