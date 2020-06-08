const wknd = (function (window, document, undefined) {

  class WKND {
    constructor(selector) {
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
    }

    /**
     * Run a callback on each item
     * @param  {Function} callback The callback function to run
     */
    each() {
      if (!callback || typeof callback !== 'function') return;
      for (let i = 0; i < this.elements.length; i++) {
        callback(this.elements[i], i);
      }
      return this;
    }

    /**
     * Add a class to elements
     * @param {String} className The class name
     */
    addClass() {
      this.each(function (item) {
        item.classList.add(className);
      });
      return this;
    }

    /**
     * Remove a class to elements
     * @param {String} className The class name
     */
    removeClass() {
      this.each(function (item) {
        item.classList.remove(className);
      });
      return this;
    }
  }

  /**
   * This allows us to have an array-like object just like
   * By assigning the underlying prototype as an array we can return an 
   * array-like object in the same fashion as jQuery:
   * w.fn.init [body, prevObject: w.fn.init(1)]
   */
  WKND.prototype = [];

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

