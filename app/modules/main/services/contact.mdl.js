(function() {

  'use strict';

  angular.module('app').factory('Contact', function($log) {
    function Contact() {
      this.type = null;
      this.id = null;
      this.email = null;
      this.first_name = '';
      this.is_active = null;
      this.is_deleted = null;
      this.last_name = '';
      this.middle = '';
      this.full_name = '';
    }

    Contact.prototype.init = function(response) {
      for (var key in response) {
        if (this.hasOwnProperty(key))
          this[key] = response[key];
      }

      this.full_name = this.getFullName();

      return this;
    }

    Contact.prototype.setName = function(name) {
      this.first_name = '';
      this.middle = '';
      this.last_name = '';

      if (name != undefined && name != null) {
        this.full_name = name.trim();
        var names = name.split(" ");

        if (names.length == 1) {
          this.first_name = names[0];
        } else if (names.length == 2) {
          this.first_name = names[0];
          this.last_name = names[1];
        } else if (names.length == 3) {
          this.first_name = names[0];
          this.middle = names[1];
          this.last_name = names[2];
        }
      }
    }

    Contact.prototype.getFullName = function() {
      if (this.first_name == null) this.first_name = '';
      if (this.middle == null) this.middle = '';
      if (this.last_name == null) this.last_name = '';
      var fn = this.first_name + ' ' + this.middle + ' ' + this.last_name;
      fn = fn.replace('  ', ' ');
      return fn;
    }

    return Contact;
  });

})();
