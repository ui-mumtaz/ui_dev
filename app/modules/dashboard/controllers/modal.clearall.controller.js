(function() {

  'use strict';

  angular.module('pb.dashboard').controller('ClearAllController',
    function($log, $modal, $modalInstance, clearIsOk) {

      var _this = this;
      _this.clearIsOk = clearIsOk;

      _this.close = function() {
        $modalInstance.close();
      };

      _this.ok = function() {
        $modalInstance.close(true);
      };


    });
})();
