'use strict';

angular.module('distillDnaApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute',
  'restangular',
  // scripts
  'distillDnaServices',
  'distillDnaControllers'
]);

angular.module('distillDnaControllers', [
  'main'
]);

angular.module('distillDnaServices', [
  'linkedin',
  'distill'
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
