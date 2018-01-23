(function() {

  'use strict';

  angular.module('app').factory('messageFactory', function($log) {

    var factory = {};

    factory.createMessage = function(messages) {
      var html = '<ul class="list-unstyled">';

      if (angular.isArray(messages)) {
        angular.forEach(messages, function(value, index) {
          html += '<li>' + value.errorDescription + '</li>';
        });
      }
      else {
        html += '<li>' + messages + '</li>';
      }

      html += '</ul>';

      return html;

    };

    return factory;

  });

})();
