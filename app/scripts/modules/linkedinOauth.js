'use strict';

/**
 * A module to include instead of `angularOauth` for a service preconfigured
 * for LinkedIn OAuth authentication.
 *
 * Guide: https://developer.linkedin.com/documents/authentication
 */
angular.module('linkedinOauth', ['angularOauth'])

  .constant('LinkedInTokenVerifier', function(config, accessToken) {
    var $injector = angular.injector(['ng']);
    return $injector.invoke(['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
      var deferred = $q.defer();
      var verificationEndpoint = 'https://www.linkedin.com/uas/oauth2/accessToken';

      $rootScope.$apply(function() {
        $http({method: 'POST', url: verificationEndpoint, params: {
          grant_type: 'authorization_code',
          code: accessToken,
          redirect_uri: config.redirectUri,
          client_id: config.clientId,
          client_secret: config.clientSecret
        }}).
          success(function(data) {
            console.log('authorized', data);
            if (data.audience === config.clientId) {
              deferred.resolve(data);
            } else {
              deferred.reject({name: 'invalid_audience'});
            }
          }).
          error(function(data, status, headers, config) {
            deferred.reject({
              name: 'error_response',
              data: data,
              status: status,
              headers: headers,
              config: config
            });
          });
      });

      return deferred.promise;
    }]);
  })

  .config(function(TokenProvider, LinkedInTokenVerifier) {
    var generateRandomState = function() {
      // ToDo: To be done properly...
      return 'XxX';
    };

    TokenProvider.extendConfig({
      authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
      scopes: [],
      state: generateRandomState(),
      verifyFunc: LinkedInTokenVerifier
    });
  });

