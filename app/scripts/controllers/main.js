// Proof of Concept
// ----------------

'use strict';

angular.module('main', [])
  .controller('MainCtrl', ['$scope', '$rootScope', 'LinkedIn',
    function ($scope, $rootScope, LinkedIn) {

      LinkedIn.onAuthorized().then(function() {
        $scope.authenticated = LinkedIn.isAuthorized();
      });

      $scope.runPoC = function() {
        LinkedIn.me().then(function(data) {
          console.log('me!', data);
        });

        LinkedIn.myConnections().then(function(data) {
          console.log('my Connections', data);
        });
      };
    }
  ]);
