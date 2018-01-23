(function() {

  'use strict';

  angular.module('pb.dashboard').controller('DareModalController',
    function($log, $modal, $modalInstance) {

      var _this = this;

      _this.close = function() {
        $modalInstance.close();
      };


    });
})();
