(function() {

  'use strict';

  angular.module('app').directive('pbFixedNavbar', function() {
    return {
      restrict: 'AE',
      link: function postLink(scope, element) {

        $('body').addClass('fixed-header');

        $(window).scroll(function() {
          if ($(this).scrollTop() > 20) {
            element.addClass('shadow');
          } else {
            element.removeClass('shadow');
          }
        });
      }
    };
  });

})();
