'use strict';

var app = angular.module('coResortTrackerApp');

app.factory('ResortKeys', function DailyResortStatus($http) {	
	
	/*
		    geojson: [ {
		                   name: 'Keystone',
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
		               }
				   ],
	*/
	
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
	};
	
	return ResortKey;
	
});