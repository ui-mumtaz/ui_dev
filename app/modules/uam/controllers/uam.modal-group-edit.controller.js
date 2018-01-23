(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('GroupEditModalController', function($log, $modalInstance, toastr) {

      var _this = this;


      _this.modal = {
        close: function() {
          if (_this.deletePrompt === true) {
            _this.deletePrompt = false;
          } else {
            $modalInstance.close();
          }
        },
        delete: function() {
          if (_this.deletePrompt === true) {
            $modalInstance.close();
            toastr.success('Group deleted.');
          } else {
            _this.deletePrompt = true;
          }
        }
      };

      _this.toast = {
        resendInvite: function() {
          toastr.success('An invitation has been re-sent to [email].');
        },
        sentPassword: function() {
          toastr.success('Instructions for resetting your password have been emailed to you.');
        },
        info: function() {
          toastr.info('The 9000 series is the most reliable computer ever made.');
        }

      };


    });
})();
