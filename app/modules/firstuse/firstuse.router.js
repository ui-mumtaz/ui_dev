(function() {

  'use strict';

  angular.module('pb.firstuse').config(function($stateProvider) {
    $stateProvider

    .state('firstuse', {
      url: '/firstuse',
      // abstract: true,
      templateUrl: 'modules/firstuse/templates/welcome.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })

    .state('firstuse.slide1', {
      url: '/slide1',
      templateUrl: 'modules/firstuse/templates/slide1.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })

    .state('firstuse.slide2', {
      url: '/slide2',
      templateUrl: 'modules/firstuse/templates/slide2.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })

    .state('firstuse.slide3', {
      url: '/slide3',
      templateUrl: 'modules/firstuse/templates/slide3.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })

    .state('firstuse.slide4', {
      url: '/slide4',
      templateUrl: 'modules/firstuse/templates/slide4.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })

    .state('firstuse.slide5', {
      url: '/slide5',
      templateUrl: 'modules/firstuse/templates/slide5.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    })




    .state('firstuse.conclusion', {
      url: '/conclusion',
      templateUrl: 'modules/firstuse/templates/conclusion.html',
      controller: 'FirstuseController as firstuse',
      data: {
        pageTitle: 'Welcome',
        access: 'public',
        bodyClass: 'welcome'
      }
    });



  });

})();
