(function() {

  'use strict';

  angular.module('app').factory('UsersFactory', ['$http',
    function($http) {

      var userData;

      return {
        getUserData: function() {
          if (!userData) {
            userData = $http.get('core/data/users.json').then(function(response) {
              return response.data;
            });
          }
          return userData;
        }
      };

    }
  ]);

})();
