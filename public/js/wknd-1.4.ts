interface WKNDConstructor {
  new (selector: string) => this;
}
interface FN {
  splice?: (start: number, deleteCount?: number, ...items: string[]) => string[],
}

interface IWKND {
  fn?: FN;
}

interface MyWindow extends Window {
  wknd: IWKND;
}

(function (window: Window, factory: (window: Window) => IWKND) {
  'use strict';

  factory(window);
})(window, function (window: Window): IWKND {

  const arr: string[] = [];

  class WKNDInit {
    length?: number;
    fn?: FN;

    constructor(selector: string) {
      const match = document.querySelectorAll<HTMLElement>(selector);
      this.length = 0;

      if (match.length) {
        match.forEach((el, idx) => {
          if (this.length !== undefined) {
            this[idx] = el;
            this.length += 1;
          }
        });
      }
      return this;
    }
  }

  function WKND(selector: string) {
    return new WKNDInit(selector);
  }

  WKND.fn = WKND.prototype = {
    splice: arr.splice,
  };

  WKNDInit.prototype = WKND;

  (window as MyWindow).wknd = WKND;

  return WKND;
});

