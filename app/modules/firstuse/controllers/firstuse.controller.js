(function() {

  'use strict';

  angular.module('pb.firstuse').controller('FirstuseController', function($log, $state, $window, $cookieStore) {

    var _this = this;

    _this.showSlides = false;

    _this.hasSeenDemo = $cookieStore.get('fbSeenDemo');

    if (_this.hasSeenDemo) {
      _this.showSlides = true;
    } else {
      _this.showSlides = false;
    }

    _this.showOutsideHelp = function() {
      window.alert('Link goes to outside help');
    };

    _this.done = function() {
      $cookieStore.put('fbSeenDemo', true);
      $state.go('dashboard');
    };


  });

})();
