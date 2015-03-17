'use strict';

var app = angular.module('coResortTrackerApp');

app.factory('ResortKeys', function DailyResortStatus($http) {	
	
	var ResortKey = {
		getBCKey: function() {
			return $http.get('../data/bcKey.geojson')
			.error(function(data) {
				console.log('Error getting BC data: ', data);
			});
		},
		getBreckKey: function() {
			return $http.get('../data/breckKey.geojson')
			.error(function(data) {
				console.log('Error getting Breck data: ', data);
			});
		},
		getVailKey: function() {
			return $http.get('../data/vailKey.geojson')
			.error(function(data) {
				console.log('Error getting Vail data: ', data);
			});
		},
		getKeystoneKey: function() {
			return $http.get('../data/keystoneKey.geojson')
			.error(function(data) {
				console.log('Error getting Keystone data: ', data);
			});
		},
		getGeoJSON: function(resortName) {
			var resortKey;
			$http.get('../data/'+resortName+'Key.geojson')
				.success(function(data) {
					resortKey = data;
				})
				.error(function(data) {
					console.log('Error getting Keystone data: ', data);
				});
			
		}
	};
	
	return ResortKey;
	
});