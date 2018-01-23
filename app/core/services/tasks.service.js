(function() {

  'use strict';

  angular.module('app').factory('tasksFactory', function($log, $resource, config) {

    return $resource(config.apiBase + 'users/tasks', {},
      {
        claim: {
          method: 'POST',
          url: config.apiBase + 'users/tasks/:id/claim',
          params: {id:'@id'}
        },
        complete: {
          method: 'POST',
          url: config.apiBase + 'users/tasks/:id/complete',
          params: {id:'@id'}
        },
        user: {
          params: {assignment: 'user'},
          isArray: true
        },
        group: {
          params: {assignment: 'group'},
          isArray: true
        }
      }
    );

  });

})();
