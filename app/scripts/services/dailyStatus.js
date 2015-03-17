'use strict';

var app = angular.module('coResortTrackerApp');

app.factory('DailyResortStatus', function DailyResortStatus($http, $q) {
	var DailyStatus = {
		getBCStatus: function() {
			return $http.get('../data/beaverCreek.json')
				.success(function(data) {
					data.forEach(function(trail) {
						var trailData = {
							'difficulty': trail.trailDifficulty,
							'status': trail.trailStatus
						};
						DailyStatus.openRuns[trail.trailName] = trailData;
					});
					return DailyStatus.openRuns;
				})
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
		getKeystoneOpenRuns: function() {
			return $http.get('../data/keystone.json')
			.success(function(data) {
				var openRuns = {};
				data.forEach(function(trail) {
					var trailData = {
						'difficulty': trail.trailDifficulty,
						'status': trail.trailStatus
					};
					openRuns[trail.trailName] = trailData;
				});
			})
			.error(function(data) {
				console.log('open Runs error');
			});
		}
	};

	return DailyStatus;

});
