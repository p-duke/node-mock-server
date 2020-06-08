const wknd = (function (window, document, undefined) {
  'use strict';

  // Variables
  const publicMethods = {};

  /**
   * Create the constructor
   * @param {String} selector The selector to use
   */
  function WKND(selector) {
    if (!selector) return;
    if (selector === 'document') {
      this.elements = [document];
      this.push([window]);
    } else if (selector === 'window') {
      this.elements = [document];
      this.push([window]);
    } else {
      const match = document.querySelectorAll(selector);
      this.elements = match;
      this.push(match.item(0)) || [];
    }
  };

  /**
   * This allows us to have an array-like object just like
   * By assigning the underlying prototype as an array we can return an 
   * array-like object in the same fashion as jQuery:
   * w.fn.init [body, prevObject: w.fn.init(1)]
   */
  WKND.prototype = [];


  // Public Methods
  publicMethods.each = (callback) => {
    if (!callback || typeof callback !== 'function') return;
    for (let i = 0; i < elements.length; i++) {
      callback(elements[i], i);
    }

    return this;
  };

  publicMethods.addClass = (className) => {
    publicMethods.each(function(item) {
      item.classList.add(className);
    });

    return this;
  };

  /**
   * Instantiate a new constructor
   */
  const init = function (selector) {
    return Object.assign([], new WKND(selector), publicMethods);
  };

  /**
   * Return the constructor instantiation
   */
  return init;

})(window, document);
