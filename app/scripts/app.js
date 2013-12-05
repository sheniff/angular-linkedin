'use strict';

angular.module('distillDnaApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute',
  'restangular',
  // scripts
  'distillDnaControllers'
]);

angular.module('distillDnaControllers', [
  'main'
]);

angular.module('distillDnaApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
