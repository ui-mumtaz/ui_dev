(function() {

  'use strict';

  angular.module('app').controller('AppCtrl',
  function($log, $rootScope, $state, authFactory) {

    var _this = this;

    $rootScope.$state = $state;

    _this.logout = function() {
      authFactory.logout().success(function() {
        _this.loggedIn = false;
        $state.go('login');
      });
    };

    $rootScope.$on('userLoggedIn', function() {
      _this.currentUser = authFactory.getCurrentUser();
      _this.loggedIn = true;
    });

    $rootScope.$on('userLoggedOut', function() {
      _this.loggedIn = false;
    });

  });

})();
