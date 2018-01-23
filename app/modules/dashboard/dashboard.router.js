(function() {

  'use strict';

  angular.module('pb.dashboard').config(function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/dashboard/templates/dashboard.html', // flex version
      controller: 'DashboardController as dashboard',
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          });
        }
      },
      data: {
        pageTitle: 'Dashboard',
        access: 'private',
        bodyClass: 'dashboard'
      }
    });
    $stateProvider.state('receive', {
      url: '/receive',
      templateUrl: 'modules/dashboard/templates/package-receive.html',
      controller: 'PackageReceiveController as packages',
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          });
        },
        RecipientsResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'recipients'
          });
        }
      },
      data: {
        pageTitle: 'Receive Packages',
        access: 'private',
        bodyClass: 'receive'
      }
    });

    $stateProvider.state('update', {
      url: '/update',
      templateUrl: 'modules/dashboard/templates/package-update.html',
      controller: 'PackageUpdateController as packages',
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          });
        },
        RecipientsResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'recipients'
          });
        }
      },
      data: {
        pageTitle: 'Deliver Package',
        access: 'private',
        bodyClass: 'update'
      }
    });

    $stateProvider.state('edit', {
      url: '/edit/:id',
      templateUrl: 'modules/dashboard/templates/package-edit-from-list.html',
      controller: 'PackageEditController as packages',
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          });
        },
        RecipientsResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'recipients'
          });
        }
      },
      data: {
        pageTitle: 'Edit Package',
        access: 'private',
        bodyClass: 'edit'
      },
      params: {
        id: null
      }
    });

    $stateProvider.state('deliver', {
      url: '/deliver',
      templateUrl: 'modules/dashboard/templates/package-deliver.html',
      controller: 'PackageDeliverController as packages',
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          });
        },
        RecipientsResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'recipients'
          });
        }
      },
      data: {
        pageTitle: 'Deliver Package',
        access: 'private',
        bodyClass: 'dashboard'
      }
    });

    $stateProvider.state('tracking', {
      url: '/tracking',
      templateUrl: 'modules/dashboard/templates/package-tracking.html',
      controller: 'PackageTrackingController as tracking',
      params: {
        term: null,
        statusIs: null
      },
      resolve: {
        PackagesResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'packages'
          }).$promise.then(function(response) {
            return response;
          });
        },
        RecipientsResolve: function($log, MockDataFactory) {
          return MockDataFactory.query({
            filename: 'recipients'
          });
        }
      },
      data: {
        pageTitle: 'Package Tracking',
        access: 'private',
        bodyClass: 'tracking'
      }
    });

  });

})();
