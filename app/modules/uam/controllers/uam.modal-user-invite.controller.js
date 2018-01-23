(function() {

  'use strict';

  angular.module('pb.fb.uam')
    .controller('UserInviteModalController', function($log, $modalInstance, UsersResolve, RolesResolve, GroupsResolve, toastr, inviteType) {

      var _this = this;

      _this.inviteType = inviteType;

      _this.users = UsersResolve;
      _this.roles = RolesResolve.roles;
      _this.groups = GroupsResolve.data;

      _this.close = function() {
        $modalInstance.close();
      };

      _this.inviteDialog = {
        close: function() {
          $modalInstance.close();
        },
        resendInvite: function() {
          toastr.success('A new invite has been sent.');
          $modalInstance.close();
        },
        firstInvite: function() {
          toastr.success('An invitation has been sent to the address(es) you’ve entered.');
          $modalInstance.close();
        }
      };


      _this.roleMenu = {
        config: {
          valueField: 'name',
          labelField: 'name',
          plugins: ['remove_button']
        },
        suggestions: _this.roles,
        selected: []
      };

      _this.roleMenu.selected = [
        _this.roleMenu.suggestions[2].name
      ];




      _this.groupMenu = {
        config: {
          valueField: 'label',
          labelField: 'label',
          plugins: ['remove_button']
        },
        suggestions:[{
          id: 1,
          label: 'Austin office',
          value: 'Austin office',
          selected: false
        }, {
          id: 2,
          label: 'Boston office',
          value: 'Boston office',
          selected: false
        }, {
          id: 3,
          label: 'New York office',
          value: 'New York office',
          selected: false
        }, {
          id: 4,
          label: 'Home-based',
          value: 'Home-based',
          selected: false
        }, {
          id: 5,
          label: 'Mac',
          value: 'Mac',
          selected: false
        }, {
          id: 6,
          label: 'Windows',
          value: 'Windows',
          selected: false
        }, {
          id: 7,
          label: 'All Groups',
          value: undefined,
          selected: false
        }],
        selected: []
      };

      _this.groupMenu.selected = [
        _this.groupMenu.suggestions[0].value,
        _this.groupMenu.suggestions[3].value
      ];





    });
})();
