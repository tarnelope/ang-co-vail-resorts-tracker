'use strict';

/**
 * @ngdoc function
 * @name coResortTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coResortTrackerApp
 */
angular.module('coResortTrackerApp')
	.controller('MainCtrl', function($rootScope, $scope, DailyResortStatus, MapService) {

		$scope.scrapeDate = '';

		$scope.changeCenter = function(resort) {
			MapService.updateMap(resort);
			DailyResortStatus.getResortStatus(resort)
				.success(function(dailyData) {
					console.log('KeystoneData retrieved! ');
					$scope.scrapeDate = dailyData[0];
					$scope.dailyData = dailyData;
				});
		};

		MapService.initMap('Keystone');
		DailyResortStatus.getResortStatus('Keystone')
			.success(function(dailyData) {
				console.log('KeystoneData retrieved! ');
				$scope.scrapeDate = dailyData[0];
				$scope.dailyData = dailyData;
			});


	});
