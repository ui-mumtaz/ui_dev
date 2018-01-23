(function() {

  'use strict';

  angular.module('pb.dashboard').controller('addUserModalController',
    function($log, $modal, $scope, $modalInstance, contact, contactType, toastr) {

      var _this = this;

      _this.contact = contact;
      _this.contactType = contactType;

      $log.debug('VALUE: ', contact);
      $log.debug('Type: ', contactType);

      _this.close = function() {
        $modalInstance.close();
      };

      _this.add = function() {
        toastr.success('User Added');
        $modalInstance.close();
      };

      if (contactType === 'recipient') {
        $scope.checkboxModel = {
          isRecipient: true,
          isSender: false
        };
      } else if (contactType === 'sender') {
        $scope.checkboxModel = {
          isRecipient: false,
          isSender: true
        };
      }

      angular.element('#save').trigger('focus');




    });
})();
