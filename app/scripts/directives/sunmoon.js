'use strict';

angular
  .module('skyApp')
  .directive('sunmoon', function() {
    return {
      restrict: 'E', 
			// Korvaa sunmoon-elementin index.html-sivulla
      templateUrl: 'views/sunmoon.html'
    };
  });