'use strict';

var app = angular.module('coResortTrackerApp');

app.factory('DailyResortStatus', function DailyResortStatus($http) {
	var DailyStatus = {
		
		getBCStatus: function() {
			return $http.get('../data/beaverCreek.json')
			.error(function(data) {
				console.log('Error getting BC data: ', data);
			});
		},
		getBreckStatus: function() {
			return $http.get('../data/breck.json')
			.error(function(data) {
				console.log('Error getting Breck data: ', data);
			});
		},
		getVailStatus: function() {
			return $http.get('../data/vail.json')
			.error(function(data) {
				console.log('Error getting Vail data: ', data);
			});
		},
		getKeystoneStatus: function() {
			return $http.get('../data/keystone.json')
			.error(function(data) {
				console.log('Error getting Keystone data: ', data);
			});
		},
	};
	
	return DailyStatus;
	
});