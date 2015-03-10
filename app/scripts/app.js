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
    'ngTouch'
  ]);
  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
