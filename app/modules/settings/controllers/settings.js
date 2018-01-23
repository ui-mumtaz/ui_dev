(function() {

  'use strict';

  angular.module('pb.settings').controller('SettingsCtrl', function($log, $scope, languages, $filter, languageFactory) {

    var _this = this;

    // languages from resolve in ui-router $state config
    _this.languages = languages.data.countries;

    ///////

    _this.init = function() {

      var code = languageFactory.getStored();

      //filter the country/language on the cookie
      _this.selectedCountry = $filter('filter')(_this.languages, {
        value: code.country
      })[0];

      _this.selectedLanguage = $filter('filter')(_this.selectedCountry.languages, {
        value: code.language
      })[0];

      languageFactory.change(_this.selectedCountry.value, _this.selectedLanguage.value, _this.selectedLanguage.rtl);

      // watch the selected country to set the selected language
      $scope.$watch('settings.selectedCountry', function(newVal, oldVal) {
        $log.debug('WATCH:', newVal, oldVal);
        if (newVal !== oldVal) {
          _this.selectedLanguage = _this.selectedCountry.languages[0];
          _this.changeLang();
        }

      });

    };

    _this.changeLang = function() {
      languageFactory.change(_this.selectedCountry.value, _this.selectedLanguage.value, _this.selectedLanguage.rtl);
    };

    //run initialize function
    _this.init();

  });

})();
