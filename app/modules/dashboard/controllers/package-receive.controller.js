(function() {

  'use strict';

  angular.module('pb.dashboard').controller('PackageReceiveController',
    function($modal, $scope, $state, $stateParams, $timeout, $cookieStore, PackagesResolve, RecipientsResolve, Contact, toastr) {

      var _this = this;

      init();

      function init() {

        _this.contact = new Contact(); // i wound up including their model

        //mine
        _this.trackingNumber = '';

        _this.packageExists = false;

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

        _this.validTrackingNumber = true;
        if (trackingNumber !== undefined) {

          if (trackingNumber === '1Z1235556700000418') {
            _this.packageExists = true;
          } else if (trackingNumber === '1Z1235556700000419') {
            _this.modals.packageExists();
          }
          _this.carrier = _this.carriers[0];
          _this.status = _this.statusMenu[0];
        }
      };


      // re-set everything when user 'saves'
      _this.save = function(which) {
        _this.resetAll();
        _this.addTableRow();
        toastr.success('Package Saved');
        if (which === 'one') {
          $state.go('dashboard');
        }
      };

      _this.print = function() {
        _this.resetAll();
      };

      _this.editPackage = function() {
        _this.packageExists = false;
      };

      // actual reset all function
      _this.resetAll = function() {
        _this.packageExists = false;
        _this.validTrackingNumber = false;
        _this.addTrackingNumber = '';
        _this.deliverTrackingNumber = '';
        _this.carrier = _this.carriers[null];
        _this.status = _this.statusMenu[null];
        _this.arrivedDamaged = false;
        _this.recipientSelect.selected = {};
        _this.senderSelect.selected = {};
        if (_this.deliverySelect) {
          _this.deliverySelect.selected = {};
        }
        //  _this.asset.sender_id = {};
        _this.comments = ' ';
        angular.element('#trackingnumber').trigger('focus');
      };





      //* MODALS  *//

      _this.clearIsOk = false;

      _this.modals = {
        showScanHelp: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/popover-scan-instructions.html',
            controller: 'CarouselCtrl as caro',
            windowClass: 'scan-help'
          });
        },
        leavePage: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/modals/modal-dare.html',
            controller: 'DareModalController as dare'
          });
        },
        packageExists: function() {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/modals/modal-exists.html',
            controller: 'PackageExistsModalController as exists'
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
            selectOnTab: true,
            openOnFocus: false,
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

      _this.limit = 0;
      _this.animating = false;

      _this.addTableRow = function() {
        _this.limit++;
        _this.animating = true;
        $timeout(function() {
          _this.animating = false;
        }, 2000);
        angular.element('#trackingnumber').trigger('focus');
      };

      // open help window by default, once
      _this.seenHelp = $cookieStore.get('fbSeenHelp');

      if (!_this.seenHelp) {
        _this.modals.showScanHelp();
      }

      $cookieStore.put('fbSeenHelp', true);


      // progress buttons
      _this.buttonLoading = {
        isLoading: false,
        text: 'Saving',
        load: function() {
          _this.buttonLoading.isLoading = true;
          $timeout(function() {
            _this.buttonLoading.isLoading = false;
          }, 1800);
        }
      };
      _this.buttonPrinting = {
        load: function() {
          _this.buttonLoading.isLoading = true;
          _this.buttonLoading.text = 'Saving and Printing';
          $timeout(function() {
            _this.buttonLoading.isLoading = false;
            _this.buttonLoading.text = 'Save';
          }, 1800);
        }
      };

      _this.placeholderText= 'Scan, enter or create a new tracking number';


      // the "create a tracking number" button
      _this.buttonAdding = {
        isLoading: false,
        text: '+',
        load: function() {
          _this.buttonAdding.isLoading = true;
          _this.buttonAdding.text = 'Creating a Tracking Number';
          _this.placeholderText = '';
          $timeout(function() {
            _this.buttonAdding.isLoading = false;
            _this.buttonAdding.text = 'Add';
          }, 1500);
        }
      };

      _this.createTrackingNumber = function() {
        $timeout(function() {
          angular.element('#trackingnumber').trigger('focus');
          _this.addTrackingNumber = '12154544';
        }, 1500);
      };






    });
})();
