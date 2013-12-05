'use strict';

angular.module('main', ['linkedinOauth'])
  .config(function(TokenProvider) {
    // var baseUrl = document.URL.replace('example/demo.html', '');

    TokenProvider.extendConfig({
      clientId: 'tbd',
      clientSecret: '???',
      redirectUri: 'http://localhost:9000/#/oauth',
      scopes: ['r_fullprofile', 'r_emailaddress', 'r_network']
    });
  })

  .controller('MainCtrl', ['$scope', '$rootScope', 'LinkedIn', 'Distill', 'Token',
    function ($scope, $rootScope, LinkedIn, Distill, Token) {

      $scope.accessToken = Token.get();

      $scope.authenticate = function() {
        var extraParams = $scope.askApproval ? {approval_prompt: 'force'} : {};

        // LinkedIn defines a response_type different from the standard 'token'
        // Done a PR to the project https://github.com/enginous/angular-oauth/pull/12
        angular.extend(extraParams, {
          response_type: 'code'
        });

        var popupOptions = {
          name: 'LinkedIn Auth'
        };

        Token.getTokenByPopup(extraParams, popupOptions)
          .then(function(params) {
            // Success getting token from popup.

            // Verify the token before setting it, to avoid the confused deputy problem.
            Token.verifyAsync(params.access_token).
              then(function(data) {
                console.log('verified async', data);
                $rootScope.$apply(function() {
                  $scope.accessToken = params.access_token;
                  $scope.expiresIn = params.expires_in;

                  Token.set(params.access_token);
                });
              }, function() {
                window.alert('Failed to verify token.');
              });

          }, function() {
            // Failure getting token from popup.
            window.alert('Failed to get token from popup.');
          },
          function() {
            // Error
            console.log('something happened...', arguments);
          });
      };

      $scope.runPoC = function() {
        // Proof of Concept: Trying to use 2 different Services with Restangular
        // ----------------

        // ToDo: OAuth process... No idea how yet... Maybe Restangular provides
        // some way to make it easier? Still to figure out.


        // **** Linkedin
        // (Based on http://developer.linkedin.com/documents/profile-api)

        // To get the current user
        LinkedIn.people().get('~').then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // To get only one person based on id
        LinkedIn.people().get('id=abcdefg').then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // To get only one person based on any other param
        LinkedIn.people().get('url=http://www.linkedin.com/in/almecija').then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // We could make simplified aliases
        LinkedIn.me().get().then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // That allows us to concatenate urls...
        LinkedIn.me().all('connections').getList().then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // ...Or making another alias for that
        LinkedIn.myConnections().getList().then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );

        // **** Distill
        // (Completely made up)
        Distill.panels().getList().then(
          function(data) { console.log('bingo', data); },
          function(error) { console.log('error', error); }
        );
      };
    }
  ]);
