'use strict';

/**
 */
angular.module('coResortTrackerApp')
.filter('array', function() {
	return function(trails) {
		var filtered = trails.splice(0, 1);
		return filtered;
	};
});