(function() {

  'use strict';

  angular.module('pb.settings').factory('languageFactory', function($log, $translateLocalStorage, $rootScope, $translate, tmhDynamicLocale, $http) {

    var lang = {};

    lang.get = function() {
      return $http.get('/core/config/languages.json');
    };

    lang.getStored = function() {

      var code = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY'),
        codeArray = code.split('-'),
        language = codeArray[0],
        country = codeArray[1],
        obj = {
          code: code,
          language: language,
          country: country
        };

      return obj;
    };

    lang.change = function(country, language, rtl) {

      var code = language + '-' + country;

      $rootScope.rtl = (rtl) ? 'rtl' : 'ltr';

      $translate.use(code);
      tmhDynamicLocale.set(code.toLowerCase());
    };

    return lang;

  });

})();
