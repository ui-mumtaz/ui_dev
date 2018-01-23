(function() {

  'use strict';

  angular.module('app')
    .factory('contactFactory', function($log, config, Contact, restService) {
      var _this = this;

      _this.senderGet = function() {
        return restService.senderGet().then(function(response) {
          var contacts = [];
          var jsonData = angular.fromJson(response.senders);

          angular.forEach(jsonData, function(value, key) {
            contacts.push(new Contact().init(value));
          });

          $log.debug('contact.fac.js, senderGet(), contacts: {0}', contacts);
          return contacts;
        });
      };

      _this.recipientGet = function() {
        return restService.recipientGet().then(function(response) {
          var contacts = [];
          var jsonData = angular.fromJson(response.recipients);

          angular.forEach(jsonData, function(value, key) {
            contacts.push(new Contact().init(value));
          });

          $log.debug('contact.fac.js, recipientGet(), contacts: {0}', contacts);
          return contacts;
        });
      };

      _this.create = function(contact) {
        delete contact.full_name;
        $log.debug('contact.fac.js, create(), contact: {0}', contact);
        return restService.contactCreate(contact);
      };

      return _this;
    });

})();
