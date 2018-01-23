(function() {

  'use strict';

  angular.module('pb.login').controller('LoginCtrl', function($log, $scope, $state, authFactory, $cookieStore) {

    var _this = this;


    _this.login = function() {

      _this.hasSeenDemo = $cookieStore.get('fbSeenDemo');

      if (_this.hasSeenDemo) {
        $state.go('dashboard');
      } else {
        $state.go('firstuse.slide1');
      }

    };


  });

})();
