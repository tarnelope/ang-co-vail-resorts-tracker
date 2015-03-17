'use strict';

/**
 * @ngdoc function
 * @name coResortTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coResortTrackerApp
 */
angular.module('coResortTrackerApp')
	.controller('MainCtrl', function($rootScope, $scope, $timeout, DailyResortStatus, ResortKeys, MapService) {
		
		$scope.scrapeDate = '';
		DailyResortStatus.getKeystoneStatus()
			.success(function(dailyData) {
				console.log('KeystoneData retrieved! ');
				$scope.scrapeDate = dailyData[0];
				$scope.dailyData = dailyData;
			});

		$scope.changeCenter = function(resort) {
			console.log('changeCenter');
			MapService.updateMap(resort);
		}
		
		MapService.createMap('Keystone');


	})
	.controller('BreckCtrl', function($rootScope, $scope, $location, $timeout, DailyResortStatus, ResortKeys, MapService) {
		
		$scope.scrapeDate = '';
		DailyResortStatus.getBreckStatus()
			.success(function(dailyData) {
				console.log('BreckData retrieved! ');
				$scope.scrapeDate = dailyData[0];
				$scope.dailyData = dailyData;
			});

		MapService.createMap('Breckenridge');


	});
