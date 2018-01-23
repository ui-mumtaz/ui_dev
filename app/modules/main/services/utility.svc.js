(function() {

  'use strict';

  angular.module('app').service('utility', function($log, $filter, $timeout, $window, $translate, config, toastr, enums, logger) {

    this.enums = enums;
    this.log = logger;

    //TODO: change implementation
    //toast with translated text
    this.toast = function(msg, toastType) {
      $translate(msg).then(

        function(translation) {
          switch (toastType) {
            case enums.toastType.success:

              toastr.success(translation);
              break;

            case enums.toastType.error:

              toastr.error(translation);
              break;

            case enums.toastType.warning:

              toastr.warning(translation);
              break;

            case enums.toastType.info:

              toastr.info(translation);
              break;
          }
        },
        function(error) {
          $log.error('utility.svc,js, translate(), error: ', error);
        });
    };
  });

})();
