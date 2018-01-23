(function() {

  'use strict';

  angular.module('pb.dashboard').controller('PackageDeliverController',
    function($log, $modal, $scope, $state, $timeout, $stateParams, PackagesResolve, RecipientsResolve, Contact, toastr) {

      var _this = this;

      init();

      function init() {

        _this.contact = new Contact(); // i wound up including their model


        //mine
        _this.trackingNumber = '';
        _this.isAdd = false;
        _this.isDeliver = false;

        _this.packages = PackagesResolve;
        _this.recipients = RecipientsResolve;

        loadRecipientsSelect();
        loadSendersSelect();

        _this.defaultState = true;

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

        _this.validTrackingNumber = true;

        if (_this.validTrackingNumber) {
          _this.carrier = _this.carriers[0];
          _this.status = _this.statusMenu[1];
        }
      };


      //* MENUS */

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

      function loadDeliverySelect() {
        _this.deliverySelect = {
          options: {
            valueField: 'id',
            labelField: 'full_name',
            searchField: ['full_name'],
            sortField: 'full_name',
            create: false,
            openOnFocus: false,
            selectOnTab: true
            // onDropdownOpen: function() {
            //   addContactActive = true;
            // },
            // onOptionAdd: function(value, $item) {
            //   if (addContactActive) {
            //     var contactType = 'sender';
            //     dispContactPopup(value, contactType);
            //   }
            // }
          },
          selected: {},
          senders: _this.recipients
        };
      }

      // re-set everything when user 'saves'
      _this.save = function(which) {
        _this.resetAll();
        _this.addTableRow();
        toastr.success('Tracking record delivered successfully');
        if (which === 'one') {
          $state.go('dashboard');
        }
      };

      // actual reset all function
      _this.resetAll = function() {
        _this.validTrackingNumber = false;
        _this.addTrackingNumber = '';
        _this.deliverTrackingNumber = '';
        _this.carrier = _this.carriers[null];
        _this.status = _this.statusMenu[null];
        _this.arrivedDamaged = false;
        _this.recipientSelect.selected = {};
        _this.senderSelect.selected = {};
        if (_this.deliverySelect) {_this.deliverySelect.selected = {};}
        //  _this.asset.sender_id = {};
        _this.comments = ' ';
        angular.element('#trackingnumber').trigger('focus');
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

      _this.limit = 0;
      _this.animating = false;

      _this.addTableRow = function() {
        _this.limit++;
        _this.animating = true;
        $timeout(function() {_this.animating = false;}, 2000);
        angular.element('#trackingnumber').trigger('focus');
      };




    });
})();
