'use strict';

/**
 * @description Parses response objects
 * @param {Object} request - The XHR request object
 * @returns {Array} An array of the responseText and the original XHR request
 */
var parse = function (request) {
  var result;
  try {
    result = JSON.parse(request.responseText);
  } catch (e) {
    result = request.responseText;
  }
  return [result, request];
};

/**
 * @module xhr
 * @description A XMLHttpRequest library for making requests
 * @param {Object} options - An object containing the type and url of the request
 * @param {string} options.type - The HTTP verb used for the request (e.g. GET)
 * @param {string} options.url - The url of the request
 * @returns {Object} The then, catch, finally callbacks to be used on the request body.
 */
var xhr = function(options) {
  var callbacks = {
    then: function() {},
    catch: function() {},
    finally: function() {},
  };

  var request = new (window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        callbacks.then.apply(callbacks, parse(request));
      } else {
        callbacks.catch.apply(callbacks, parse(request));
      }
    }
  };

  request.onloadend = function() {
    callbacks.finally.apply(callbacks, parse(request));
  };

  request.open(options.type, options.url);

  request.send();

  return {
    then: function(callback) {
      callbacks.then = callback;
      delete this.then;
      return this;
    },
    catch: function(callback) {
      callbacks.catch = callback;
      return this;
    },
    finally: function(callback) {
      callbacks.finally = callback;
      return this;
    }
  };
};

