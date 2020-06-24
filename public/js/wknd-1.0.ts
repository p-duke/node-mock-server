interface FN {
  splice: (start: number, deleteCount?: number, ...items: string[]) => string[];
  init?: (selector: string) => void;
}

interface WKNDIF {
  fn: FN;
  prototype: any;
}

declare global {
  interface Window {
    wknd: WKNDIF;
  }
}

const factory = function (window: Window) {
  'use strict';

  let match: NodeListOf<HTMLElement>;
  const arr: string[] = [];
  const document = window.document;

  const WKND: WKNDIF = function (selector: string) {
    return new WKND.fn.init(selector);
  };

  WKND.fn = WKND.prototype = {
    splice: arr.splice
  };

  // Initialize a WKND object
  const init = (WKND.fn.init = function (selector: string) {
    match = document.querySelectorAll<HTMLElement>(selector);
    this.length = 0;

    if (match.length) {
      match.forEach((el, idx) => {
        this[idx] = el;
        this.length += 1;
      });
    }

    return this;
  });

  const publicMethods = {
    each: function (callback: (arg: any, index: number) => void) {
      if (!callback || typeof callback !== 'function') {
        return;
      }

      for (let i = 0; i < match.length; i++) {
        callback(match[i], i);
      }
      return this;
    },
    addClass: function (className: string) {
      publicMethods.each((item: HTMLElement) => {
        item.classList.add(className);
      });
      return this;
    },
    removeClass: function (className: string) {
      publicMethods.each((item: HTMLElement) => {
        item.classList.remove(className);
      });
      return this;
    }
  };

  // Give the init function the WKND prototype for access to shared proto methods
  init.prototype = Object.assign({}, WKND.fn, publicMethods);

  window.wknd = WKND;

  return WKND;
};

export default (function (window: Window, factory: (window: Window) => WKNDIF) {
  'use strict';

  factory(window);
})(window, factory);

