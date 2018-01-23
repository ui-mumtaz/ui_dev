(function() {

  'use strict';

  angular.module('app')
    .directive('pbTour', function() {
      return {
        restrict: 'EA',
        controller: 'TourController as tour',
        //  template:   '<button ng-click="tour.click()" class="btn btn-default btn-lg">Tour</button>',
        link: function(scope, element, attrs) {

        }
      };
    })
    .controller('TourController', function($scope, $attrs, $modal) {

      var _this = this;

      _this.startCarousel = function() {

        var tourWindow = $modal.open({
          windowClass: 'product-tour',
          backdropClass: 'tour-bg',
          templateUrl: 'core/templates/pb-tour.template.html',
          size: 'modal-lg',


          controller: function($scope, $http, $log, $state, $modalInstance, toastr) {


            $scope.myInterval = 0; // no auto changing

            $scope.slides = [
              { image: 'assets/img/card1.png', active: '', caption: ''},
              { image: 'assets/img/card2.png', active: '', caption: ''},
              { image: 'assets/img/card3.png', active: '', caption: ''},
              { image: 'assets/img/card4.png', active: '', caption: ''},
              { image: 'assets/img/card5.png', active: '', caption: ''},
              { image: 'assets/img/card6.png', active: '', caption: ''}
          ];





            $scope.ok = function() {
              $log.debug('FEEDBACK: ', $state.current.name, $state.params, $scope.comment, $scope.rating);

              $http.post('feedback/url/here', {
                stateName: $state.current.name,
                statParams: $state.params,
                comment: $scope.comment,
                rating: $scope.rating,
                type: $scope.type
              });

              $modalInstance.close();
              toastr.success('Thanks for your feedback.');
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');

            };
          },
          resolve: {
            items: function() {
              return $scope.items;
            }
          }
        });
      };

      _this.startCarousel();

    });

})();
