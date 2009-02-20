/*!
 * Copyright (c) 2009 Larry Myers
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
 *
 * Locus - A Geolocation Javascript Library
 */
(function() {  
  var obj = {};
  
  function checkGeode() {
    return (typeof navigator.geolocation != 'undefined');
  };
  
  function doGeode(successCallback, errorCallback, options) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };
  
  function checkLoki() {
    return (typeof LokiAPI == 'function');
  };
  
  function doLoki(successCallback, errorCallback, options) {    
    var loki = LokiAPI();
    loki.onSuccess = successCallback;
    loki.onFailure = errorCallback;
    loki.setKey(options.LOKI_KEY);
    loki.requestLocation(true,loki.NO_STREET_ADDRESS_LOOKUP);
  };
  
  function checkGears() {
    return (typeof window.google != 'undefined');
  };
  
  function doGears(successCallback, errorCallback, options) {
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(successCallback, errorCallback);
  };
  
  /**
   * Check if the service is available on the client browser.
   * Returns boolean value as result.
   */
  obj.check = function(serviceName) {
    var flag = false;
    
    if (!serviceName || (typeof serviceName != 'string')) {
      return flag;
    }
    
    switch(serviceName.toLowerCase()) {
      case 'loki':
        flag = checkLoki();
        break;
      case 'geode':
        flag = checkGeode();
        break;
      case 'gears':
        flag = checkGears();
        break;
      default:
        flag = false;
    }
    
    return flag;
  };
  
  /**
   * Gets the current lat/lng of the client browser, and passes
   * the result to the provided callback function.
   */
  obj.getCurrentPosition = function(callback, errorCallback, options) {    
    if (typeof options == 'undefined') {
      options = {};
    }
    
    var serviceList;
    
    if (options.serviceList) {
      serviceList = options.serviceList;
    } else {
      serviceList = ['loki','geode','gears'];
    }
    
    for (var i = 0; i < serviceList.length; i++) {
      if (serviceList[i] == 'loki' && options.LOKI_KEY && checkLoki()) {
        doLoki(callback, errorCallback, options);
        return;
      } else if (serviceList[i] == 'geode' && checkGeode()) {
        doGeode(callback, errorCallback, options);
        return;
      } else if (serviceList[i] == 'gears' && checkGears()) {
        doGears(callback, errorCallback, options);
        return;
      }
    }
    
    errorCallback('No location services were found.');
  };

  window.locus = obj;
})();
