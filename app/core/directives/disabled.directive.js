(function() {

  'use strict';

  angular.module('app')
  .directive('pbDisabled', function() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      link: function(scope, element, attrs) {

        var $element = angular.element(element);

        scope.$watch('ngModel', function(newVal, oldVal) {
          if (newVal) {
            $element.css({
              background: '#fff',
              opacity: '.2',
              'pointer-events': 'none'
            });
          }
          else {
            $element.removeAttr('style');
          }
        });

      }
    };
  });

})();
