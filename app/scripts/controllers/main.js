'use strict';

/**
 * @ngdoc function
 * @name coResortTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coResortTrackerApp
 */
angular.module('coResortTrackerApp')
	.controller('MainCtrl', function($scope, $location, DailyResortStatus, ResortKeys) {

		$scope.scrapeDate = '';
		DailyResortStatus.getKeystoneStatus()
			.success(function(keystoneData) {
				console.log('KeystoneData retrieved! ');
				$scope.scrapeDate = keystoneData[0];
				$scope.keystoneData = keystoneData;
			});

		$scope.changeResort = function() {
			console.log('works!');
		};

		$scope.isActive = function(viewLocation) {
			var active = (viewLocation === $location.path());
			return active;
		};
		
		$scope.resortKey = '';
		ResortKeys.getKeystoneKey()
			.success(function(data) {
				console.log(data.features);
				$scope.resortKey = data;
			});

		angular.extend($scope, {
			keystone: {
				lon: -105.9137,
				lat: 39.5658,
				zoom: 14
			},
		    geojson: [             
				{name: 'Keystone',
	                   source: {
	                       type: 'GeoJSON',
						   url: '../data/keystoneKey.geojson'
					   },
	                   style: {
	                       fill: {
	                           color: 'rgba(255, 0, 255, 0.6)'
	                       },
	                       stroke: {
	                           color: 'black',
	                           width: 3
	                       }
	                   }
				   }],
			defaults: {
				layers: {
					main: {
						source: {
							type: 'OSM',
							url: 'http://{a-c}.tile.opensnowmap.org/cycle/{z}/{x}/{y}.png'
						}
					}
				},
			}
		});

	});
