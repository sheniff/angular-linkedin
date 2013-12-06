'use strict';

angular.module('linkedin', [])
  .value('LinkedInAPIKey', '')
  .service('LinkedIn', ['$window', '$q', 'LinkedInAPIKey', function LinkedIn($window, $q, LinkedInAPIKey) {

    var In = $window.IN;

    var init = function(key, extraParams) {
      var params = { api_key: key || LinkedInAPIKey || null };
      angular.extend(params, extraParams);
      In.init(params);
    };

    var getMetadata = function(data) {
      var metadata = {};

      angular.forEach(data, function(value, key){
        if(key[0] === '_')
          metadata[key] = value;
      });

      return metadata;
    };

    // Init
    if(LinkedInAPIKey)
      init(LinkedInAPIKey, { authorize: true });

    return {
      init: function(key, params) {
        if(!In){
          if($window.IN)
            In = $window.IN;
          else{
            console.error('LinkedIn JS library can not be found. Remember to add <script src="http://platform.linkedin.com/in.js?async=true"> block to your html');
            return false;
          }
        }

        if(!key && !LinkedInAPIKey){
          console.error('No key was provided to initialize. You can pass it as an argument to init function or define it as a value for linkedin module');
          return false;
        }

        init(key, params);
      },

      // Events
      onAuthorized: function() {
        var response = $q.defer();

        In.Event.on(In, 'auth', function() {
          response.resolve();
        }, this);

        return response.promise;
      },

      // Status
      isAuthorized: function() {
        return In.User.isAuthorized();
      },

      // Data
      me: function() {
        var response = $q.defer();

        In.API.Profile('me').result(function(data) {
          response.resolve(data.values[0], getMetadata(data));
        });

        return response.promise;
      },

      myConnections: function() {
        var response = $q.defer();

        In.API.Connections('me').result(function(data) {
          response.resolve(data.values, getMetadata(data));
        });

        return response.promise;
      }
    };
  }]);
