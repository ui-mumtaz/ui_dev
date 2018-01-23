(function() {

  'use strict';

  angular.module('pb.dashboard').controller('CarouselCtrl', function($log, $modalInstance) {

    var _this = this;

    _this.myInterval = 5000;

    _this.slides = [
      { path: 'modules/dashboard/assets/img/Fedex_label.png', active: '', caption: ''},
      { path: 'modules/dashboard/assets/img/UPS_label.png', active: '', caption: ''},
      { path: 'modules/dashboard/assets/img/USPS_label.png', active: '', caption: ''},
      { path: 'modules/dashboard/assets/img/DHL_label.png', active: '', caption: ''}
    ];


    _this.closeme = function() {
      $modalInstance.close();
    };

  });
})();
