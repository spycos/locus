/*!
* Locus v0.8 - A Geolocation Javascript Library
*
* Copyright (c) 2009 Larry Myers (larry@larrymyers.com)
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {  
    var gears,

    // the W3C Geolocation Specification

    checkW3C = function() {
        return (typeof navigator.geolocation != 'undefined');
    },

    doW3C = function(successCallback, errorCallback, options) {
        var success = function(location) {
            normalizeLocation(location);
            locus.lastPosition = location;
            successCallback(location);
        }

        navigator.geolocation.getCurrentPosition(success, errorCallback, options);
    },

    // Google Gears implementation

    checkGears = function() {
        return (gears) ? true : false;
    },

    doGears = function(successCallback, errorCallback, options) {
        var success = function(location) {
            normalizeLocation(location);
            locus.lastPosition = location;
            successCallback(location);
        }

        var error = function(positionError) {
            errorCallback(positionError.message);
        }

        gears.getCurrentPosition(success, error);
    },

    normalizeLocation = function(location) {      
        if (!location.coords && location.latitude && location.longitude) {
            location.coords = {latitude: location.latitude, longitude: location.longitude};
        }

        if (!location.latitude && !location.longitude && location.coords) {
            location.latitude = location.coords.latitude;
            location.longitude = location.coords.longitude;
        }
        
        return location;
    };

    // init the geolocation APIs

    if (typeof window.google != 'undefined') {
        gears = google.gears.factory.create('beta.geolocation');
    }

    /**
    * The locus namespace.
    */
    window.locus = {
        /**
         * The last successfully determined position
         */
        lastPosition: null,

        /**
         * Check if the service is available on the client browser.
         * Returns boolean value as result.
         */
        check: function(serviceName) {
            var flag = false;

            if (!serviceName || (typeof serviceName != 'string')) {
                return flag;
            }

            switch(serviceName.toLowerCase()) {
                case 'w3c':
                flag = checkW3C();
                break;
                case 'gears':
                flag = checkGears();
                break;
            }

            return flag;
        },
        
        loadGears: function(url) {
            if (!url) {
                url = "http://code.google.com/apis/gears/gears_init.js";
            }
            
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = function() {
                gears = google.gears.factory.create('beta.geolocation');
            }
            
            document.body.appendChild(script);
        },

        /**
         * Gets the current lat/lng of the client browser, and passes
         * the result to the provided success callback function. On failure
         * the error message will be passed to the error callback. Options
         * are specific to each service implementation.
         */
        getCurrentPosition: function(callback, errorCallback, options) {    
            if (typeof options == 'undefined') {
                options = {};
            }

            var serviceList, i = 0;

            if (options.serviceList) {
                serviceList = options.serviceList;
            } else {
                serviceList = ['w3c','gears'];
            }

            for (; i < serviceList.length; i++) {
                if (serviceList[i] == 'w3c' && checkW3C()) {
                    doW3C(callback, errorCallback, options);
                    return;
                } else if (serviceList[i] == 'gears' && checkGears()) {
                    doGears(callback, errorCallback, options);
                    return;
                }
            }

            errorCallback('No location services were found.');
        }
    }
})();
