'use strict';

angular
  .module('skyApp')
  .directive('infoModal', function() {
    return {
      restrict: 'E', 
			// Korvaa info-modal-elementin index.html-sivulla
      templateUrl: 'views/infoModal.html'
    };
  });