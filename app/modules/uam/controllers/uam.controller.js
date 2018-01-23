(function() {

  'use strict';

  angular.module('pb.fb.uam').controller('UserListController',
    function($log, UsersResolve, RolesResolve, GroupsResolve, UserPrivilegesResolve, AdminPrivilegesResolve, $modal, toastr) {

      var _this = this;

      _this.filterMenusModel = {};
      _this.users = UsersResolve;
      _this.roles = RolesResolve.roles;
      _this.groups = GroupsResolve;
      _this.privileges = UserPrivilegesResolve;
      _this.AdminPrivileges = AdminPrivilegesResolve;
      _this.userLimit = 10;


      _this.userFilter = {
        group: undefined,
        status: undefined
      };

      _this.groupCount = function(group) {
        var count = _this.users.filter(function(el) {
          return el.group === group;
        });
        return count.length;
      };

      _this.permissionTypes = ['Shipping Permissions', 'Additional Permissions'];


      // status filter menu
      _this.statusMenu = [{
        label: 'Active & Invited (9)',
        val: 'Active'
      }, {
        label: 'Active (7)',
        val: 'Active'
      }, {
        label: 'Inactive (10)',
        val: 'Inactive'
      }, {
        label: 'Invited (2)',
        val: 'Invited'
      }, {
        label: 'All Users',
        val: undefined
      }];
      _this.statusShown = _this.statusMenu[0];

      // show quantity menu (not displayed in this UI)
      // _this.numShownMenu = [10, 20, 30, 40];
      // _this.numShown = _this.numShownMenu[1];


      _this.groupMenu = [{
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
      }];

      _this.groupShown = _this.groupMenu[0];

      _this.modals = {
        editUser: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-edit-user.html',
            controller: 'UserEditModalController as useredit',
            size: 'lg',
            resolve: {
              items: function() {
                return _this.user;
              },
              UsersResolve: function($log, UsersFactory) {
                return UsersFactory.getUserData();
              }
            }
          });
        },
        deleteUser: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-delete-user.html',
            controller: 'UserDeleteModalController as userdelete',
            resolve: {
              items: function() {
                return _this.user;
              }
            }
          });
        },
        inviteUser: function(inviteType) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-invite-user.html',
            controller: 'UserInviteModalController as invite',
            inviteType: inviteType,
            resolve: {
              items: function() {
                return _this.user;
              },
              UsersResolve: function($log, UsersFactory) {
                return UsersFactory.getUserData();
              },
              RolesResolve: function(RolesFactory) {
                return RolesFactory.getRolesData();
              },
              GroupsResolve: function(MockDataFactory) {
                return MockDataFactory.query({
                  filename: 'groups'
                });
              },
              inviteType: function() {
                return inviteType;
              }
            }
          });
        },
        reinviteUser: function(inviteType) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-invited-edit-user.html',
            controller: 'UserInviteModalController as invite',
            inviteType: inviteType,
            resolve: {
              items: function() {
                return _this.user;
              },
              UsersResolve: function($log, UsersFactory) {
                return UsersFactory.getUserData();
              },
              GroupsResolve: function(MockDataFactory) {
                return MockDataFactory.query({
                  filename: 'groups'
                });
              },
              RolesResolve: function(RolesFactory) {
                return RolesFactory.getRolesData();
              },
              inviteType: function() {
                return inviteType;
              }
            }
          });
        },
        buySeats: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-buy-seats.html',
            controller: 'BuySeatsModalController as buyseats'
          });
        },
        addGroup: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-add-group.html',
            controller: 'GroupAddModalController as groupadd',
            resolve: {
              items: function() {
                return _this.user;
              }
            }
          });
        },
        editGroup: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/uam/templates/modals/modal-edit-group.html',
            controller: 'GroupEditModalController as groupedit',
            resolve: {
              items: function() {
                return _this.user;
              }
            }
          });
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

      _this.checkAll = function() {
        var selected = !_this.selectedAll;
        angular.forEach(_this.groupMenu, function(group) {
          group.selected = selected;
        });
      };


      //group
      _this.group = {
        dropdownLabel: 'All Groups',
        selected: [],
        selectItem: function(id) {
          if (_this.group.selected.indexOf(id) === -1) {
            _this.group.selected.push(id);
          } else {
            _this.group.selected.splice(_this.group.selected.indexOf(id), 1);
            _this.group.allSelected = false;
          }
        },
        allChecked: function() {
          var selected = 0;

          angular.forEach(_this.groups, function(value, key, obj) {
            if (value.selected) {
              selected++;
            }
          });

          return (selected !== 0 && selected === _this.groups.length);
        },
        allClick: function(type) {
          var checked = !_this.group.allChecked();

          _this.group.selected = [];

          angular.forEach(_this.groups, function(value, key, obj) {
            value.selected = checked;

            if (checked) {
              _this.group.selected.push(value.index);
            }

          });

        },
        dropdownChange: function(group) {
          _this.group.dropdownLabel = group.label;
          _this.userFilter.group = group.value;
        }
      };



      // roles tab
      _this.shortRolesList = [
        {label: 'Admin', active: true, url: 'modules/uam/templates/partials/uam-roles-admin.html' },
        {label: 'User',  active: false, url: 'modules/uam/templates/partials/uam-roles-user.html'}
        ];

      _this.activeTabIndex = 0;
      _this.activeTabPath = _this.shortRolesList[_this.activeTabIndex].url;

      _this.addNewRole = function() {
        unHighlightAll();
        _this.shortRolesList.push({label: 'Untitled Role',  active: true, url: 'modules/uam/templates/partials/uam-roles-new.html'});
        _this.activeTabIndex = _this.shortRolesList.length;
        _this.activeTabPath = _this.shortRolesList[_this.activeTabIndex - 1].url;
      };

      _this.switchRole = function($index) {
        unHighlightAll();
        _this.shortRolesList[$index].active = true;
        _this.activeTabIndex = $index;
        _this.activeTabPath = _this.shortRolesList[_this.activeTabIndex].url;
      };

      function unHighlightAll() {
        angular.forEach(_this.shortRolesList, function(value, key) {
          value.active = false;
        });
      }





      //roles tab (old, table version)
      _this.rolesTab = {
        allSelected: false,
        selected: [],
        selectItem: function(id) {
          if (_this.rolesTab.selected.indexOf(id) === -1) {
            _this.rolesTab.selected.push(id);
          } else {
            _this.rolesTab.selected.splice(_this.rolesTab.selected.indexOf(id), 1);
            _this.rolesTab.allSelected = false;
          }
        },
        allChecked: function() {
          var selected = 0;

          angular.forEach(_this.roles, function(value, key, obj) {
            if (value.selected) {
              selected++;
            }
          });

          return (selected !== 0 && selected === _this.roles.length);
        },
        allClick: function(type) {
          var checked = !_this.rolesTab.allChecked();

          _this.rolesTab.selected = [];

          angular.forEach(_this.roles, function(value, key, obj) {
            value.selected = checked;

            if (checked) {
              _this.rolesTab.selected.push(value.index);
            }

          });

        }
      };


      //status
      _this.status = {
        dropdownLabel: 'All Users',
        selected: [],
        dropdownChange: function(group) {
          _this.status.dropdownLabel = group.label;
          _this.userFilter.status = group.val;
        }
      };

      // selectize menu for Roles
      _this.rolesSelect = {
        options: {
          valueField: 'name',
          labelField: 'name',
          searchField: ['name'],
          plugins: ['remove_button']
        }
      };





    });
})();
