(function() {

  'use strict';

  angular.module('app')
    .directive('pbFeedback', function() {
      return {
        restrict: 'EA',
        controller: 'FeedbackController as feedback',
        template: '' +
          '<div ' +
          'ng-click="feedback.click()" ' +
          'style="-ms-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); ' +
          'transform: rotate(-45deg);padding: 10px 50px 50px 50px; text-align: center;' +
          ' background: #72bf44; color: #fff; position: fixed; bottom: -17px; right: -57px;">Feedback</div>',
        link: function(scope, element, attrs) {

        }
      };
    })
    .controller('FeedbackController', function($scope, $attrs, $modal) {

      var _this = this;

      _this.click = function() {

        var modalInstance = $modal.open({
          windowClass: 'feedback-modal',
          templateUrl: 'core/templates/feedback.template.html',

          controller: function($scope, $http, $log, $state, $modalInstance, toastr) {
            $scope.rating = 'smile';
            $scope.rate = 0;
            $scope.max = 5;
            $scope.isReadonly = false;
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

    });

})();
