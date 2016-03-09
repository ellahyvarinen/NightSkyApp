'use strict';

angular
  .module('skyApp')
  .directive('banner', function() {
    return {
      restrict: 'E', 
			// Korvaa banner-elementin index.html-sivulla
      templateUrl: 'views/banner.html'
    };
  });