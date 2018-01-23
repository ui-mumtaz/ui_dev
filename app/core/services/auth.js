(function() {

  'use strict';

  angular.module('app').factory('authFactory',
    function($log, config, $window, $state, $rootScope, $http, $base64) {

      var baseUrl = config.apiBase + 'users';

      var authFactory = {};

      authFactory.getCurrentUser = function() {
        return angular.fromJson($window.sessionStorage.getItem('currentUser'));
      };

      authFactory.isLoggedIn = function() {
        return $window.sessionStorage.getItem('isLoggedIn');
      };

      authFactory.getCredentials = function() {
        return $window.sessionStorage.getItem('credentials');
      };

      authFactory.login = function(data) {
        // // var auth = 'Basic ' + $base64.encode(data.name + ':' + data.password);

        // return $http.get(baseUrl, {
        //   headers: {
        //     Authorization: auth
        //   }
        // }).success(function(response) {
        //   $http.defaults.headers.common.Authorization = auth;
        //   $window.sessionStorage.setItem('credentials', auth);
        //   $window.sessionStorage.setItem('isLoggedIn', 'true');
        //   $window.sessionStorage.setItem('currentUser', JSON.stringify(response));
        $rootScope.$emit('userLoggedIn');

        //   return response;
        // }).error(function(e) {
        //   //TODO: the error response should be a JSON object, not a plain string
        // });

      };

      authFactory.logout = function() {
        $window.sessionStorage.removeItem('isLoggedIn');
        $window.sessionStorage.removeItem('currentUser');
        $window.sessionStorage.removeItem('credentials');
        $rootScope.$emit('userLoggedOut');

        $http.defaults.headers.common.Authorization = null;

        return $http.get('');
      };

      ///////////////////////////////

      authFactory.skipLogin = function() {
        $window.sessionStorage.setItem('isLoggedIn', 'true');
        $window.sessionStorage.setItem('skippedLogin', 'true');
        return $http.get('');
      };

      return authFactory;

    });

})();
