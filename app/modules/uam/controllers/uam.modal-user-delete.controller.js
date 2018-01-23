(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('UserDeleteModalController', function($log, $modalInstance) {

      var _this = this;

      _this.close = function() {
        $modalInstance.close();
      };


    });
})();
