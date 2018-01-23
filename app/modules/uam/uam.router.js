(function() {

  'use strict';

  angular.module('pb.fb.uam').config(function($stateProvider) {
    $stateProvider.state('users', {
      url: '/users',
      templateUrl: 'modules/uam/templates/uam-userlist.html',
      controller: 'UserListController as users',
      resolve: {
        UsersResolve: function(UsersFactory) {
          return UsersFactory.getUserData();
        },
        RolesResolve: function(RolesFactory) {
          return RolesFactory.getRolesData();
        },
        GroupsResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'groups'});
        },
        AdminPrivilegesResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'privileges-admin'});
        },
        UserPrivilegesResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'privileges'});
        }
      },
      data: {
        pageTitle: 'Users',
        access: 'public',
        bodyClass: 'uam'
      }
    });
    $stateProvider.state('editrole', {
      url: '/editrole',
      templateUrl: 'modules/uam/templates/uam-add-role.html',
      controller: 'RolesController as roles',
      resolve: {
        UsersResolve: function(UsersFactory) {
          return UsersFactory.getUserData();
        },
        RolesResolve: function(RolesFactory) {
          return RolesFactory.getRolesData();
        },
        GroupsResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'groups'});
        },
        AdminPrivilegesResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'privileges-admin'});
        },
        UserPrivilegesResolve: function(MockDataFactory) {
          return MockDataFactory.query({filename: 'privileges'});
        }
      },
      data: {
        pageTitle: 'Users',
        access: 'public',
        bodyClass: 'uam'
        
      }
    });


  });

})();
