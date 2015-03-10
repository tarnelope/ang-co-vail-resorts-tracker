'use strict';

/**
 * @ngdoc function
 * @name coResortTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coResortTrackerApp
 */
angular.module('coResortTrackerApp')
  .controller('MainCtrl', function ($scope, DailyResortStatus) {
	  
	  $scope.scrapeDate = '';
	  DailyResortStatus.getKeystoneStatus()
	  	.success(function(keystoneData) {
	  		console.log('KeystoneData retrieved! ');
			$scope.scrapeDate = keystoneData[0];
			$scope.keystoneData = keystoneData;
	  	});

  });
