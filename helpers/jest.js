// Local storage
const localStorageMock = (function() {
    let store = {};
    return {
      getItem: (key) => {
        return store[key];
      },
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: function(key) {
        delete store[key];
      }
    };
  })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Define Property
const defineProperty = (obj, property, state) => {
  Object.defineProperty(obj, property, {
    configurable: true,
    get: function () {
      if (state === 'error') {
        throw new Error(
          'DOMException: Blocked a frame with origin "shazaa!" from accessing a cross-origin frame.'
        );
      }
      return state;
    }
  });
};

// Mock img.onload
Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    if (src === LOAD_FAILURE_SRC) {
      // Call with setTimeout to simulate async loading
      setTimeout(() => this.onerror(new Error('mocked error')));
    } else if (src === LOAD_SUCCESS_SRC) {
      setTimeout(() => this.onload());
    }
  },
});

// Or simply and then test the code in that onload function
Object.defineProperty(global.Image.prototype, 'src', {
  set() {
    this.onload();
  },
});


// Mock XHR
const oldXMLHttpRequest = window.XMLHttpRequest;
let mockXHR;

beforeEach(() => {
  mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: JSON.stringify({isPreviousCustomer: false, isSubscriber: false})
  };

  window.XMLHttpRequest = jest.fn(() => mockXHR);
});

afterEach(() => {
  window.XMLHttpRequest = oldXMLHttpRequest;
});

mockXHR.onreadystatechange();

// Mock document.createElement for a specific element
const originalCreateElement = window.document.createElement;
let img = new Image();
window.document.createElement = jest.fn(() => img);
// Then you can test img.src after code has run

// Mock jQuery.on / off - Remove all events if you dont have original function
const removeAllEvents = () => {
  var old = document.querySelector('body');
  var newNode = old.cloneNode(true);
  old.parentNode.replaceChild(newNode, old);
};

beforeEach(() => {
  bouncex.off = jest.fn(removeAllEvents);
});

bouncex.on = jest.fn((_, __, callback) => {
  document.querySelector('input').addEventListener('blur', callback);
});

// Mock window.location.href
const defineProperty = (obj, property, state) => {
  Object.defineProperty(obj, property, {
    value: state
  });
};

beforeEach(() => {
  defineProperty(window, 'location', { href: 'www.ronloveslilsebastian.com' });
});

afterEach(() => {
  window.location.href = 'www.ronloveslilsebastian.com';
});

// Mock document.cookie
beforeEach(() => {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'status=active',
  });
});

// Mock a new Function or Class entirely

// import Criteria from './criteria';
//
jest.mock('./criteria', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        evaluate: jest.fn().mockReturnValue(true),
      };
    }),
  }
});

// To change the return value
Criteria.mockImplementation(() => {
  return {
    evaluate: jest.fn().mockReturnValue(false)
  };
});


