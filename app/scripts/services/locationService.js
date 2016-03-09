'use strict';

angular
  .module('skyApp')
  .service('LocationService', function() {

    var coords = {
      lat: '',
      long: '',
			location: ''
    };

    coords.setCoordinates = function(key, value) {
      coords[key] = value;
    };

    function coordinates(position) {
      coords.lat = position.coords.latitude;
      coords.long = position.coords.longitude;
			console.log(coords);
    }

    //GEOLOCATION
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(coordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    return coords;
  });
