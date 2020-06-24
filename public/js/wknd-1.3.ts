interface WKND {}

interface MyWindow extends Window {
  wknd: WKND;
}

export default (function (window: Window, factory: (window: Window) => WKND) {
  'use strict';

  factory(window);
})(window, function (window: Window): WKND {
  const arr: string[] = [];
  const init = (WKND.fn.init = function (this: typeof init, selector: string) {
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
  });

  function WKND(selector: string): WKND {
    return new init(selector);
  }

  WKND.fn = WKND.prototype = init.prototype = {
    splice: arr.splice
  } as WKND;

  (window as MyWindow).wknd = WKND;

  return WKND;
});

