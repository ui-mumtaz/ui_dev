(function() {

  'use strict';

  angular.module('pb.fb.uam').config(function($stateProvider) {
    $stateProvider.state('users', {
      url: '/users',
      templateUrl: 'modules/uam/templates/uam-userlist.html',
      controller: 'UserListController as users',
      resolve: {
        UsersResolve: function($log, UsersFactory) {
          return UsersFactory.getUserData();
        }
      },
      data: {
        pageTitle: 'Users',
        access: 'public'
      }
    });
    $stateProvider.state('usersalt', {
      url: '/usersalt',
      templateUrl: 'modules/uam/templates/uam-userlist_alt.html',
      controller: 'UserListAltController as users',
      resolve: {
        UsersResolve: function($log, UsersFactory) {
          return UsersFactory.getUserData();
        }
      },
      data: {
        pageTitle: 'Users',
        access: 'public'
      }
    });


  });

})();


