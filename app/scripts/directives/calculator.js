'use strict';

angular
  .module('skyApp')
  .directive('calculator', function() {
    return {
      restrict: 'E', 
			// Korvaa calculator-elementin index.html-sivulla
      templateUrl: 'views/calculator.html'
    };
  });