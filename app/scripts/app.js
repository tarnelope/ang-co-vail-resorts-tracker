'use strict';

/**
 * @ngdoc overview
 * @name coResortTrackerApp
 * @description
 * # coResortTrackerApp
 *
 * Main module of the application.
 */
angular
  .module('coResortTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
