(function() {

  'use strict';

  angular.module('pb.fb.uam').controller('RolesController',
    function($log, UsersResolve, RolesResolve, GroupsResolve, PrivilegesResolve, $modal, $modalInstance, toastr) {

      var _this = this;


      _this.rolePrivileges = [];

      _this.preselected = ['David Alexander', 'Laura Jordan'];
      _this.editUsersAllowed = true;

      _this.users = UsersResolve;
      _this.roles = RolesResolve.roles;
      _this.groups = GroupsResolve;
      _this.rolePrivileges = PrivilegesResolve;

      _this.roleTypeMenu = [{
        name: 'User',
        val: 'User'
      }, {
        name: 'Admin',
        val: 'Admin'
      }];

      _this.roleType = _this.roleTypeMenu[0];




      _this.usersSelect = {
        options: {
          valueField: 'full_name',
          labelField: 'full_name',
          searchField: ['full_name'],
          plugins: ['remove_button']
        }
      };

      _this.close = function() {
        $modalInstance.close();
      };








    });
})();
