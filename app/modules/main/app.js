/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function() {

  'use strict';


  angular.module('app', [
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'angular-loading-bar',
    'base64',
    'toggle-switch',
    'toastr',
    'ngMessages',
    'ui.utils',
    'selectize-ng',
    'pb.login',
    'pb.dashboard',
    'pb.fb.uam',
    'pb.firstuse',
    'daterangepicker',
    'angularMoment'
    ]);

  //debugging
  angular.module('app').config(function($logProvider, config) {
    $logProvider.debugEnabled(config.debug);
  });


  angular.module('app').config(function($httpProvider) {

  });


  //TOASTR config
  angular.module('app').config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      allowHtml: true
    });
  });

  //APP RUN
  angular.module('app').run(function($rootScope, $state, $stateParams, $log, $window, $http, authFactory) {

    //use the credentials from session storage if they exist
    if ($window.sessionStorage.getItem('credentials')) {
      $http.defaults.headers.common.Authorization = $window.sessionStorage.getItem('credentials');
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $log.info(
        'To State:', toState,
        'From state:', fromState,
        'authFactory.isLoggedIn(): ', authFactory.isLoggedIn()
      );

      if (!toState || !toState.data) {
        return;
      }

      $rootScope.$emit('userLoggedIn');

      $rootScope.productName = 'SendSuite Tracking Online';
      $rootScope.productNameText = 'SendSuite Tracking Online';

      //if user goes to private page and is not logged in
      // if (toState.data.access === 'private' && !authFactory.isLoggedIn()) {
      //   // Stop redirect
      //   event.preventDefault();
      //   authFactory.logout();
      //   $state.go('login');
      //   return;
      // }

      //if user goes to login page and is logged in
      // else if (toState.name === 'login' && authFactory.isLoggedIn()) {
      //   // Stop redirect
      //   event.preventDefault();
      //   $rootScope.$emit('userLoggedIn');
      //   $state.go(fromState.name);
      //   return;
      // }
      // else if (authFactory.isLoggedIn()) {
      //   $rootScope.$emit('userLoggedIn');
      // }

    });

    // handle state change error
    $rootScope.$on('$stateChangeError', function(event, toState, tpParams, fromState, fromParams, error) {
      $log.debug('$stateChangeError: ', error);
    });

    //handle state not found
    $rootScope.$on('$stateNotFound', function(unfoundState) {
      $log.debug('$stateNotFound: ', unfoundState);
    });

  });

})();
