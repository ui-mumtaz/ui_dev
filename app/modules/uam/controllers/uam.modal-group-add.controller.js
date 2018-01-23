(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('GroupAddModalController', function($log, $modalInstance) {

      var _this = this;

      _this.close = function() {
        $modalInstance.close();
      };


    });
})();
