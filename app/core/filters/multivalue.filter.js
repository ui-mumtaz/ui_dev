(function() {

  'use strict';

  angular.module('app').filter('multivalue', function() {
    return function(movies, genres) {
      var items = {
        genres: genres,
        out: []
      };
      angular.forEach(movies, function(value, key) {
        if (this.genres[value.genre] === true) {
          this.out.push(value);
        }
      }, items);
      return items.out;
    };
  });



})();
