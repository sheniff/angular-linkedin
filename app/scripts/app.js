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

// Global API Key definition
angular.module('angularLinkedin').value('LinkedInAPIKey', 't306b65wael0');

angular.module('angularLinkedin')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/oauth', {
        templateUrl: 'views/oauth2callback.html',
        controller: 'CallbackCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
