'use strict';

angular
  .module('skyApp')
  .directive('forecast', function() {
    return {
      restrict: 'E', 
			// Korvaa forecast-elementin index.html-sivulla
      templateUrl: 'views/forecast.html'
    };
  });