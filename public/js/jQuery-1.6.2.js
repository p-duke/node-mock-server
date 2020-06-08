(function( window, undefined ) {

  //Hello, jQuery
  var jQuery = (function() {

    // Define a local copy of jQuery.
    // The jQuery object is actually just the init constructor 'enhanced'
    var jQuery = function( selector, context ) {
      return new jQuery.fn.init( selector, context, rootjQuery );
    },


      // ### jQuery prototype
      jQueryfn = jQuery.prototype = {

        constructor: jQuery,

        // Main jQuery function
        init: function( selector, context, rootjQuery ) {
        },

        // Start with an empty selector
        selector: "",

        // The current version of jQuery being used
        jquery: "1.6.2",

        // The default length of a jQuery object is 0
        length: 0,
      };

    // Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn;


    // Merge the contents of two or more objects together into the first object
    jQuery.extend = jQuery.fn.extend = function() {};

    jQuery.extend({});

    return jQuery;

  })
})();
