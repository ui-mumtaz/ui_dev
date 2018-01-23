(function() {

  'use strict';

  angular.module('pb.login').controller('ForgotPasswordCtrl', function($log, $scope, $state) {

    var _this = this;

    _this.emailAddress = null;

    var tries = 0;
    _this.firstErrorState = false;
    _this.secondErrorState = false;
    _this.successState = false;

    _this.sendPassword = function() {
      if (tries === 0) {
        tries++;
        _this.firstErrorState = true;
        return;
      }
      if (tries === 1) {
        _this.firstErrorState = false;
        _this.secondErrorState = false;
        _this.successState = true;
        return;
      }
    };

    _this.resetPassword = function() {
      $state.go('dashboard');
    }

  });



})();
