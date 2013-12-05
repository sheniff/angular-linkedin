'use strict';

angular.module('angularLinkedin', [
  'ngCookies',
  'ngSanitize',
  'ngRoute',
  'restangular',
  // scripts
  'angularLinkedinServices',
  'angularLinkedinControllers'
]);

angular.module('angularLinkedinControllers', [
  'main'
]);

angular.module('angularLinkedinServices', [
  'linkedin',
  'distill'
]);

angular.module('angularLinkedin')
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
