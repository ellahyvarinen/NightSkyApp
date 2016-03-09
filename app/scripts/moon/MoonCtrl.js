'use strict';

angular
  .module('skyApp')
  .controller('MoonController', MoonController);

function MoonController(AjaxFactory, $scope, $filter) {

  $scope.getMoon = function() {
    var request = AjaxFactory.getMoon($scope.from, $scope.to);
		
    request.then(function(resp) {
      // tee vastauksella jotain
      $scope.moons = resp.data.response;
      console.log(resp.data.response);
    }, function(error) {
      // tee virheellä jotain
      console.log(error.data);
    });
  }
	
}
