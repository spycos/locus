(function() {
  var obj = {};
  
  obj.getPosition = function(successCallback, failureCallback, options) {
    var pos = {};
    
    if (typeof navigator.geolocation != 'undefined') {
      navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
      return;
    } else if (typeof LokiAPI == 'function' && typeof options.LOKI_KEY != 'undefined') {
      var loki = LokiAPI();
      loki.onSuccess = successCallback;
      loki.onFailure = failureCallback;
      loki.setKey(options.LOKI_KEY);
      loki.requestLocation(true,loki.NO_STREET_ADDRESS_LOOKUP);
      return;
    }
  };
  
  window.locus = obj;
})();