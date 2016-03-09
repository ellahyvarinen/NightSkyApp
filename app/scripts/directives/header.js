'use strict';

angular
  .module('skyApp')
  .directive('header', function() {
    return {
      restrict: 'E', 
			// Korvaa header-elementin index.html-sivulla
      templateUrl: 'views/header.html'
    };
  });