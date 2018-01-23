(function() {

  'use strict';

  angular.module('pb.login').controller('WelcomeCtrl', function($log, $state) {

    var _this = this;

    _this.emailAddress = null;

    _this.sendUsername = function() {
      if (_this.emailAddress !== null) {
        _this.isValid = true;
        _this.isInvalid = false;

      } else {
        _this.isInvalid = true;
        _this.isValid = false;
      }
    };

    _this.setPassword = function() {
      $state.go('dashboard');
    };

  });

})();
