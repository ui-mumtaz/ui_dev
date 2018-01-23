(function() {

  'use strict';

  angular.module('pb.firstuse').controller('Carousel', function($log) {

    var _this = this;

    _this.myInterval = 5000;

    _this.slides = [
      { path: 'assets/img/barcode_Fedex-help.png', active: '', caption: ''},
      { path: 'assets/img/barcode_UPS-help.png', active: '', caption: ''},
      { path: 'assets/img/barcode_USPS-help.png', active: '', caption: ''},
      { path: 'assets/img/barcode_DHL-help.png', active: '', caption: ''}
    ];

    // _this.close = function() {
    //   $modalInstance.close();
    // };




  });
})();
