'use strict';

angular
  .module('skyApp')
  .directive('moonCalendar', function() {
    return {
      restrict: 'E', 
			// Korvaa moonCalendar-elementin index.html-sivulla
      templateUrl: 'views/moonCalendar.html',
			link: function () {
				// Moon Calendar
				$(function() {
					$('.datepicker').datepicker({
						dateFormat: 'yy-mm-dd'
					});
				});
			}
    };
  });