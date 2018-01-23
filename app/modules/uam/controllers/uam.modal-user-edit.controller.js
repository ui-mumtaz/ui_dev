(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('UserEditModalController', function($log, $modalInstance, UsersResolve, toastr) {

      var _this = this;

      _this.users = UsersResolve;

      // the toggle switch in edit user modal
      _this.activeuser = false;

      _this.close = function() {
        $modalInstance.close();
      };

      _this.editDialog = {
        close: function() {
          $modalInstance.close();
        },
        resendInvite: function() {
          toastr.success('A new invite has been sent.');
          $modalInstance.close();
        }
      };





      _this.userType = 'always';

      // _this.multiGroupSelect = {
      //   options: {
      //     valueField: 'label',
      //     labelField: 'label',
      //     searchField: ['label'],
      //     plugins: ['remove_button']
      //   },
      //   suggestions: _this.groupMenu
      // };

      _this.config = {
        valueField: 'value',
        labelField: 'text',
        plugins: ['remove_button']
      };


      _this.suggestions = [{
        text: 'Austin office',
        value: '1'
      }, {
        text: 'Boston office',
        value: '2'
      }, {
        text: 'New York office',
        value: '3'
      }, {
        text: 'Home-based',
        value: '4'
      }, {
        text: 'Mac',
        value: '5'
      }, {
        text: 'Windows',
        value: '6'
      }];

      _this.selected = [_this.suggestions[0]['value'], _this.suggestions[3]['value']];




      _this.roleMenu = [{
        label: 'User',
        value: 'User'
      }, {
        label: 'Admin',
        value: 'Admin'
      }];

      _this.userRole = _this.roleMenu[0];




      // status filter menu
      _this.statusMenu = [{
        label: 'Active',
        val: 'Active'
      }, {
        label: 'Invited',
        val: 'Invited'
      }, {
        label: 'Deleted',
        val: 'Deleted'
      }, {
        label: 'All Users',
        val: ''
      }];
      _this.userStatus = _this.statusMenu[0];







    });
})();
