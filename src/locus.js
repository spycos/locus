(function() {
  // preserve any preexisting geolocation implementation
  var oldGeo = null;
  if (typeof navigator.geolocation != 'undefined') {
    oldGeo = navigator.geolocation;
  }
  
  var obj = {};
  
  function geode(successCallback, errorCallback, options) {
    oldGeo.getCurrentPosition(successCallback, errorCallback);
  };
  
  function loki(successCallback, errorCallback, options) {    
    var loki = LokiAPI();
    loki.onSuccess = successCallback;
    loki.onFailure = errorCallback;
    loki.setKey(options.LOKI_KEY);
    loki.requestLocation(true,loki.NO_STREET_ADDRESS_LOOKUP);
  };
  
  function gears(successCallback, errorCallback, options) {
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(successCallback, errorCallback);
  };
  
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
      if (serviceList[i] == 'loki' && typeof LokiAPI == 'function' && options.LOKI_KEY) {
        loki(callback, errorCallback, options);
        return;
      } else if (serviceList[i] == 'geode' && oldGeo != null) {
        geode(callback, errorCallback, options);
        return;
      } else if (serviceList[i] == 'gears' && window.google) {
        gears(callback, errorCallback, options);
        return;
      }
    }
    
    errorCallback('No location services were found.');
  };
  
  // navigator.geolocation = obj;
  window.locus = obj;
})();
