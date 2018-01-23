(function() {

  'use strict';

  angular.module('app')
    .factory('addContactPopup', function($log, $modal) {
      var _this = this;

      _this.contact = new Contact();

      _this.show = function(value, contactType, recipients, senders) {

        var modalInstance = $modal.open({

          windowClass: 'contact-modal',
          templateUrl: 'common/templates/addContact.html',
          resolve: {
            translate: function($translatePartialLoader) {
              $translatePartialLoader.addPart('/common/resources');
            }
          },
          controller: function($scope, $modalInstance) {
            $scope.contact = _this.contact;
            _this.contact.setName(value);
            _this.contact.type = contactType;
            if (contactType === contactType.recipient) {
              _this.contactList = recipients;
              $scope.checkboxModel = {
                isRecipient: true,
                isSender: false
              };
            } else if (contactType === contactType.sender) {
              _this.contactList = senders;
              $scope.checkboxModel = {
                isRecipient: false,
                isSender: true
              };
            }

            $scope.modalConfirm = function() {
              if ($scope.checkboxModel.isRecipient) {
                _this.contact.full_name = _this.contact.getFullName();
              }

              if (_this.contains(_this.contact.full_name, _this.contactList)) {
                //utility.toast('addContact.duplicateContact', toastType.error);
              } else {
                if ($scope.checkboxModel.isSender && $scope.checkboxModel.isRecipient) {
                  _this.contact.type = contactType.recipient_and_sender;
                }
                if ($scope.checkboxModel.isSender && !$scope.checkboxModel.isRecipient) {
                  _this.contact.first_name = _this.contact.full_name;
                  _this.contact.middle = '';
                  _this.contact.last_name = '';
                  _this.contact.full_name = null;
                }

                $modalInstance.close(_this.contact);
              }
            };

            $scope.modalCancel = function() {
              $modalInstance.dismiss('cancel');
            };

            _this.contains = function(full_name, contacts) {
              var isContains = false;
              full_name = full_name.toLowerCase();
              for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].full_name.toLowerCase() === full_name) {
                  isContains = true;
                  break;
                }
              }
              return isContains;
            };

          }
        });

        return modalInstance.result;
      };

      return _this;
    });

})();
