(function() {

  'use strict';

  angular.module('pb.login').config(function($stateProvider) {
    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'modules/login/templates/login.html',
      controller: 'LoginCtrl as login',
      data: {
        pageTitle: 'Login',
        access: 'public',
        bodyClass: 'signin'
      }
    })

    .state('resetpassword', {
      url: '/resetpassword',
      templateUrl: 'modules/login/templates/reset_password.html',
      controller: 'ForgotPasswordCtrl as forgot',
      data: {
        pageTitle: 'Forgot Password',
        access: 'public',
        bodyClass: 'signin'
      }
    })

    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'modules/login/templates/forgot_password.html',
      controller: 'LoginCtrl as login',
      data: {
        pageTitle: 'Reset Password',
        access: 'public',
        bodyClass: 'signin'
      }
    })

    .state('forgotusername', {
      url: '/forgotusername',
      templateUrl: 'modules/login/templates/forgot_username.html',
      controller: 'ForgotUsernameCtrl as fu',
      data: {
        pageTitle: 'Forgot Username',
        access: 'public',
        bodyClass: 'signin'
      }
    })

    .state('welcome', {
      url: '/welcome',
      templateUrl: 'modules/login/templates/welcome.html',
      controller: 'WelcomeCtrl as welcome',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'signin'
      }
    });

  });

})();
