'use strict';

angular
  .module('skyApp')
  .controller('WeatherController', WeatherController);

function WeatherController(AjaxFactory, $scope, LocationService) {
  $scope.coords = {};

  function coordinates() {
    $scope.coords.lat = LocationService.lat;
    $scope.coords.long = LocationService.long;
    var request = AjaxFactory.getWeather($scope.coords);
    request.then(function(resp) {
      // tee vastauksella jotain
      $scope.forecast = resp.data.response[0];
			WeatherController.forecast = resp.data.response[0];
			//$scope.day = resp.data.response[];
      console.log(resp);
    }, function(error) {
      // tee virheellä jotain
      console.log(error.data);
    });
  }

  $scope.$watch(function() {
    return LocationService.lat;
  }, function() {
    console.log(LocationService.lat);
    //if (newValue !== '') {
      coordinates();
    //}
  });
}


/*
'use strict';

angular
  .module('skyApp')
  .controller('WeatherController', WeatherController);

function WeatherController(AjaxFactory, $scope) {

  $scope.coords = {};

  function coordinates(position) {
    $scope.coords.lat = position.coords.latitude;
    $scope.coords.long = position.coords.longitude;
    var request = AjaxFactory.getWeather($scope.coords);
    request.then(function(resp) {
      // tee vastauksella jotain
      $scope.forecast = resp.data.response[0];
      console.log(resp.data.response[0].periods[0]);
    }, function(error) {
      // tee virheellä jotain
      console.log(error.data);
    });
  }
  //GEOLOCATION
  $scope.getCoordinates = function() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(coordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  $scope.getCoordinates();
}
*/
