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
	  
	  DailyResortStatus.getKeystoneStatus()
	  	.success(function(keystoneData, status) {
	  		console.log('KeystoneData retrieved! ', status, keystoneData);
			
			$scope.keystoneData = keystoneData;
	  	});

  });
