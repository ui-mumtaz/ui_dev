(function() {

  'use strict';

  angular.module('app').filter('slug', function() {
    return function(input) {
      if (input) {
        return input.toLowerCase().replace(/[^a-z_]/g, '_');
      }
    };
  });

})();
