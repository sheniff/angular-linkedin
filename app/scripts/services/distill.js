'use strict';

angular.module('distill', [])
  .service('Distill', ['Restangular', function Distill(Restangular) {

    var baseUrl = 'http://distill.cc/api/v1';

    return {
      panels: function() {
        return Restangular.setBaseUrl(baseUrl).all('panels');
      }
    };
  }]);
