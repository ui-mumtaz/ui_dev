(function() {

  'use strict';


  angular.module('app').factory('RolesFactory', ['$http',
    function($http) {

      var rolesData;

      return {
        getRolesData: function() {
          if (!rolesData) {
            rolesData = $http.get('core/data/roles.json').then(function(response) {
              return response.data;
            });
          }
          return rolesData;
        }
      };

    }
  ]);

})();
