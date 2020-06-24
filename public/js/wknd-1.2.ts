interface FN {
  splice: (start: number, deleteCount?: number, ...items: string[]) => string[];
  init?: (selector: string) => void;
  length?: number;
  [index: number]: HTMLElement;
}

interface IWKND {
  fn: FN;
  prototype: object;
}

interface MyWindow extends Window {
  wknd: IWKND;
}

const factory = function (window: Window) {
  "use strict";

  let match: NodeListOf<HTMLElement>;
  const arr: string[] = [];
  const document = window.document;

  const WKND: IWKND = function (selector: string) {
    if (WKND.fn.init !== undefined) {
      return new WKND.fn.init(selector);
    }
  };

  WKND.fn = WKND.prototype =  {
    splice: arr.splice,
  };

  // Initialize a WKND object
  const init = (WKND.fn.init = function (selector: string) {
    match = document.querySelectorAll<HTMLElement>(selector);
    this.length = 0;

    if (match.length) {
      match.forEach((el,idx)=>{
        if (this.length !== undefined) {
          this[idx] = el;
          this.length += 1;
        }
      });
    }

    return this;
  });

  // Methods that every instance will have access to via delegation on the WKND prototype chain
  const baseMethods = {
    each: function (callback: (arg: any, index: number) => void) {
      if (!callback || typeof callback !== 'function') { return; }

      for (let i = 0; i < match.length; i++) {
        callback(match[i], i);
      }
      return this;
    },
    addClass: function (className: string) {
      baseMethods.each((item: HTMLElement) => {
        item.classList.add(className);
      });
      return this;
    },
    removeClass: function (className: string) {
      baseMethods.each((item: HTMLElement) => {
        item.classList.remove(className);
      });
      return this;
    },
  };

  // Add the WKND object and the base methods to the prototype chain
  init.prototype = Object.assign({}, WKND.fn, baseMethods);

  (window as MyWindow).wknd = WKND;

  return WKND;
};

(function (window: Window, factory: (window: Window) => IWKND) {
  "use strict";

  factory(window);

})(window, factory);

