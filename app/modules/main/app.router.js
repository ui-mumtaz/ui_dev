(function() {

  'use strict';

  angular.module('app').config(function($stateProvider) {
    $stateProvider.state('otherwise', {
      url: '*path',
      template: '',
      controller: function($state, authFactory) {
        authFactory.logout();
        $state.go('login');
      }
    });
  });
  


})();
