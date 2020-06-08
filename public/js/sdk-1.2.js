(function(window, undefined) {
    'use strict';

    var SDK = (function(selector) {

        var SDK = function(selector) {
            return new sdkFn.init(selector);
        }

        var arr = []
        var sdkFn = SDK.prototype = {
            constructor: SDK,
            init: function(selector) {
                var match = document.querySelectorAll(selector);
                this.length = 0;
                if (match.length) {
                    match.forEach((el,idx)=>{
                        this[idx] = el;
                        this.length += 1;
                    }
                    );
                }
                return this;
            },
            selector: "",
            length: 0,
            slice: arr.slice,
        };

        sdkFn.init.prototype = sdkFn;

        return SDK;
    }
    )();

    window.SDK = SDK;

})(window);

