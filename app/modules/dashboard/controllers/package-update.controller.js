(function() {

  'use strict';

  angular.module('pb.dashboard').controller('PackageUpdateController',
    function($log, $modal, $scope, $state, $stateParams, PackagesResolve, RecipientsResolve, Contact, toastr) {

      var _this = this;

      _this.isDelivered = false;


      init();

      function init() {

        _this.contact = new Contact(); // i wound up including their model


        //mine
        _this.trackingNumber = '';



        _this.packages = PackagesResolve;
        _this.recipients = RecipientsResolve;

        loadRecipientsSelect();
        loadSendersSelect();

      }

      angular.element('#trackingnumber').trigger('focus');





      //* EDIT BY ID  *//
      _this.recordNum = $stateParams.id; // must be a number!!


      _this.currentPackage = _this.packages.filter(function(pkg) {
        return pkg.id === _this.recordNum;
      });




      //* TRACKING NUMBER ENTRY  *//

      // once valid tracking # entered
      _this.validTrackingNumber = false;

      // called by form to submit tracking number
      _this.submitNumber = function(packageType, trackingNumber) {

        // if anything was in the tracking number field let's call it valid
        _this.validTrackingNumber = true;
        // set the carrier menu to first item to simulate
        if (_this.validTrackingNumber) {
          _this.carrier = _this.carriers[0];
          _this.status = _this.statusMenu[0];
        }
      };

      // re-set everything when user "saves"
      _this.save = function(which) {
        _this.validTrackingNumber = false;
        _this.addTrackingNumber = '';
        _this.deliverTrackingNumber = '';
        _this.carrier = _this.carriers[null];
        toastr.success('Package updated');
        if (which === 'one') {
          $state.go('dashboard');
        }

      };

      _this.resetAll = function() {
        _this.validTrackingNumber = false;
        _this.addTrackingNumber = '';
        _this.deliverTrackingNumber = '';
        _this.carrier = _this.carriers[null];
      };


      //* MODALS  *//

      _this.clearIsOk = false;

      _this.modals = {
        leavePage: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/modals/modal-dare.html',
            controller: 'DareModalController as dare'
          });
        },
        showScanHelp: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/popover-scan-instructions.html',
            controller: 'CarouselCtrl as caro',
            windowClass: 'scan-help'
          });
        },
        clearAll: function() {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/modals/modal-clearall.html',
            controller: 'ClearAllController as clearall',
            resolve: {
              clearIsOk: function() {
                return _this.clearIsOk;
              }
            }
          });
        }
      };



      _this.carriers = [{
        name: 'UPS',
        value: 'UPS'
      }, {
        name: 'USPS',
        value: 'USPS'
      }, {
        name: 'FedEx',
        value: 'FedEx'
      }];



      _this.statusMenu = [{
        label: 'Received',
        value: 'received'
      }, {
        label: 'Delivered',
        value: 'delivered'
      }, {
        label: 'Attempted',
        value: 'attempted'
      }, {
        label: 'Refused',
        value: 'refused'
      }];





      // NEW CODE from QA

      function loadRecipientsSelect() {
        _this.recipientSelect = {
          options: {
            valueField: 'id',
            labelField: 'full_name',
            searchField: ['full_name'],
            sortField: 'full_name',
            create: true,
            openOnFocus: false,
            selectOnTab: true,
            onDropdownOpen: function() {
              addContactActive = true;
            },
            onOptionAdd: function(value, $item) {
              if (addContactActive) {
                var contactType = 'recipient';
                dispContactPopup(value, contactType);
              }
            }
          },
          selected: {},
          recipients: _this.recipients
        };

      }

      function loadSendersSelect() {
        _this.senderSelect = {
          options: {
            valueField: 'id',
            labelField: 'full_name',
            searchField: ['full_name'],
            sortField: 'full_name',
            create: true,
            openOnFocus: false,
            selectOnTab: true,
            onDropdownOpen: function() {
              addContactActive = true;
            },
            onOptionAdd: function(value, $item) {
              if (addContactActive) {
                var contactType = 'sender';
                dispContactPopup(value, contactType);
              }
            }
          },
          selected: {},
          senders: _this.recipients
        };
      }

      var addContactActive = false; //get around bug in control






      function dispContactPopup(value, contactType) {
        //$log.debug('value in function', value); //ok
        //$log.debug('contactType in function', contactType); //ok

        var contact = angular.copy(_this.contact);
        contact.first_name = value;
        contact.full_name = value;

        // _this.contact = Contact.setName(value);

        var modalInstance = $modal.open({
          windowClass: 'contact-modal',
          templateUrl: 'modules/dashboard/templates/modals/modal-addContact.html',
          controller: 'addUserModalController as adduser',
          resolve: {
            contact: function() {
              return contact;
            },
            contactType: function() {
              return contactType;
            }
          }

        });
      }




      function addContact(contact, contactType) {
        // code to simulate adding contact


      }

















    });
})();
