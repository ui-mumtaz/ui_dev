(function() {

  'use strict';

  angular.module('pb.dashboard').controller('DashboardController',
    function($log, $modal, $scope, $state, PackagesResolve) {

      var _this = this;

      _this.recentPackages = PackagesResolve;
      _this.trackingNumber = '';
      _this.isAdd = false;
      _this.isDeliver = false;


      _this.modals = {
        leavePage: function(user) {
          $modal.open({
            animation: true,
            templateUrl: 'modules/dashboard/templates/modals/modal-dare.html',
            controller: 'DareModalController as dare'
          });
        }

      };

      //draggable options
      _this.draggable = {
        connectWith: '.column',
        handle: '.panel-heading',
        cursor: 'move',
        placeholder: 'placeholder',
        forcePlaceholderSize: true,
        opacity: 0.4
      };



      // called by form to submit tracking number
      _this.submitSearch = function(searchTerm) {
        $state.go('tracking', {term: searchTerm});
      };


    });
})();
