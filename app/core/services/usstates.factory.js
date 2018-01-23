(function() {

  'use strict';

  angular.module('app').factory('usStatesFactory', function($log, $http) {

    var usStatesFactory = {};

    usStatesFactory.get = function() {
      return $http.get('core/services/data/states_hash.json');
    };

    return usStatesFactory;

  });

})();
