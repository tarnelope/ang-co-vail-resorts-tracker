'use strict';

var app = angular.module('coResortTrackerApp');

app.factory('DailyResortStatus', function DailyResortStatus($http) {
	var DailyStatus = {
		getResortStatus: function(resort) {
			var resortName = resort.toLowerCase().replace(/\s/g, '');
			var jsonFile = '../data/' + resortName + '.json';
			return $http.get(jsonFile)
				.error(function(data) {
					console.log('Error getting ' + jsonFile, data);
				});
		}
	};

	return DailyStatus;

});
