(function() {

  'use strict';

  angular.module('pb.settings').config(function($stateProvider) {
    $stateProvider.state('settings', {
      url: '/settings',
      templateUrl: 'modules/settings/templates/settings.html',
      controller: 'SettingsCtrl as settings',
      resolve: {
        translate: function($translatePartialLoader) {
          $translatePartialLoader.addPart('/modules/settings/i18n');
        },
        languages: function(languageFactory) {
          return languageFactory.get();
        }
      },
      data: {
        pageTitle: 'Settings',
        access: 'private'
      }
    });
  });

})();
