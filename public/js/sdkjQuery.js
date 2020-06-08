(function(global, factory) {
  "use strict";

  factory(global);

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window) {
  'use strict';

  /**
   * Create the constructor
   * @param {String} selector The selector to use
   */
  var WKND = function (selector, context) {

		return new init(selector, context);
  };

  WKND.prototype = {
    constructor: WKND,
  };

  /**
   * Instantiate a new constructor
   */
  var init = function(selector, context) {
    if (!selector) return;
    if (selector === 'document') {
      this.elements = [document];
      this.push([window]);
    } else if (selector === 'window') {
      this.elements = [document];
      this.push([window]);
    } else {
      const match = document.querySelectorAll(selector);
    }
  };

  /**
   * Run a callback on each item
   * @param  {Function} callback The callback function to run
   */
  // WKND.prototype.each = function (callback) {
    // if (!callback || typeof callback !== 'function') return;
    // for (let i = 0; i < this.elements.length; i++) {
      // callback(this.elements[i], i);
    // }
    // return this;
  // };

  // WKND = Object.assign({}, WKND, each: function {
    // if (!callback || typeof callback !== 'function') return;
    // for (let i = 0; i < this.elements.length; i++) {
      // callback(this.elements[i], i);
    // }

    // return this;
  // });

  window.WKND = WKND;

  /**
   * Return the constructor instantiation
   */
  return WKND;
});


