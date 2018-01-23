'use strict';

/**
 * @ngdoc directive
 * @name designSystemApp.directive:pbPanelCollapsible
 * @description
 * # pbPanelCollapsible
 */
angular.module('app')
  .directive('pbPanelCollapsible', function() {
    return {
      restrict: 'EA',
      scope: {
        iconOpen: '@',
        iconClosed: '@'
      },
      link: function postLink(scope, element, attrs) {

        var options = {
          iconOpen: (scope.iconOpen) ? scope.iconOpen : 'glyphicon glyphicon-chevron-up',
          iconClosed: (scope.iconClosed) ? scope.iconClosed : 'glyphicon glyphicon-chevron-down'
        };

        element.addClass('collapse-btn ' + options.iconOpen);

        element.on('click', function(event) {
          var isOpen = $(this).hasClass('closed'),
            $panelBody = $(this).closest('.panel').find('.panel-body');

          if (!isOpen) {
            $panelBody.slideUp(200);
            $(this).removeClass(options.iconOpen).addClass(options.iconClosed + ' closed');
          } else {
            $panelBody.slideDown(200);
            $(this).removeClass(options.iconClosed + ' closed').addClass(options.iconOpen);
          }

          event.preventDefault();
        });
      }
    };
  });
