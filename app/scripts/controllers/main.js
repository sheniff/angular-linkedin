'use strict';

angular.module('main', [])
  .controller('MainCtrl', ['$scope', 'LinkedIn', 'Distill',
    function ($scope, LinkedIn, Distill) {

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
    }
  ]);
