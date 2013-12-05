'use strict';

angular.module('linkedin', [])
  .service('LinkedIn', ['Restangular', function LinkedIn(Restangular) {

    var baseUrl = 'http://api.linkedin.com/v1/';

    return {
      people: function() {
        return Restangular.setBaseUrl(baseUrl).all('people');
      },

      me: function() {
        return Restangular.setBaseUrl(baseUrl).one('people', '~');
      },

      myConnections: function() {
        return Restangular.setBaseUrl(baseUrl).one('people', '~').all('connections');
      }
    };
  }]);
