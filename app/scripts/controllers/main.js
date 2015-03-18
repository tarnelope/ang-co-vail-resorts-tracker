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
		
		$scope.selectedTab = 'Keystone';

		$scope.changeCenter = function(resort) {
			MapService.updateMap(resort);
			DailyResortStatus.getResortStatus(resort)
				.success(function(dailyData) {
					$scope.scrapeDate = dailyData[0];
					$scope.dailyData = dailyData;
				});
			$scope.selectedTab = resort;
		};

		MapService.initMap('Keystone');
		DailyResortStatus.getResortStatus('Keystone')
			.success(function(dailyData) {
				$scope.scrapeDate = dailyData[0];
				dailyData.shift();
				$scope.dailyData = dailyData;
			});
			
			$scope.resortActive = true;

	});
