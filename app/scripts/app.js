'use strict';

/**
 * @ngdoc overview
 * @name coResortTrackerApp
 * @description
 * # coResortTrackerApp
 *
 * Main module of the application.
 */
var app = angular
  .module('coResortTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'openlayers-directive'
  ]);
  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/keystone', {
        templateUrl: 'views/main.html',
        controller: 'KeystoneCtrl'
      })
      .when('/breck', {
        templateUrl: 'views/main.html',
        controller: 'BreckCtrl'
      })
      .otherwise({
        redirectTo: '/',
		controller: 'MainCtrl'
		  
      });
  });
