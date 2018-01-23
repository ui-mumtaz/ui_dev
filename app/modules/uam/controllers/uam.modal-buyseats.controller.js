(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('BuySeatsModalController', function($log, $modalInstance, toastr) {

      var _this = this;

      _this.close = function() {
        $modalInstance.close();
      };

      _this.buyDialog = {
        close: function() {
          $modalInstance.close();
        },
        buySeats: function() {
          toastr.success('[n] seats added. You now have [n] seats available.');
          $modalInstance.close();
        }
      };


    });
})();
