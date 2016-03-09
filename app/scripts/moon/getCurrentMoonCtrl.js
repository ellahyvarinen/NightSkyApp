'use strict';

angular
  .module('skyApp')
  .controller('CurrentMoonController', CurrentMoonController);

function CurrentMoonController(AjaxFactory, $scope, LocationService) {
  $scope.coords = {};

  function coordinates() {
    $scope.coords.lat = LocationService.lat;
    $scope.coords.long = LocationService.long;
    var request = AjaxFactory.getCurrentMoon($scope.coords);
    request.then(function(resp) {
      // tee vastauksella jotain
      $scope.moonInfo = resp.data.response[0];
			CurrentMoonController.moonInfo = resp.data.response[0];
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
