'use strict';

angular
  .module('skyApp')
  .controller('LocationController', LocationController);

function LocationController(AjaxFactory, $scope, LocationService) {
  $scope.coords = {};

  function coordinates() {
    $scope.coords.lat = LocationService.lat;
    $scope.coords.long = LocationService.long;
    var request = AjaxFactory.getLocation($scope.coords);
    request.then(function(resp) {
      $scope.location = resp.data.response[0];
      LocationController.location = resp.data.response[0];
      console.log(resp.data);
    }, function(error) {
      console.log(error.data);
    });
  }

  $scope.$watch(function() {
    return LocationService.lat;
  }, function() {
    console.log(LocationService);
    //if (LocationService.lat !== '') {
			console.log(LocationService.lat);
      coordinates();
    //}

  });
}
