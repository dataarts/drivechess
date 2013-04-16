'use strict';

angular.module('chessApp')
  .directive('editable', function($timeout) {
  return {
    template: [
      '<span ng-hide="editMode" ng-click="editMode = true" class="gameTitle">{{value}}</span><input ng-show="editMode" ng-model="value" type="text" class="gameTitleEdit" />'
    ].join('\n'),
    require: 'ngModel',
    restrict: 'E',
    link: function($scope, element, attrs, ngModel) {
      var input = element.find('input');
      var span = element.find('span');
      var getWidth = function() {
        return span.width();
      };
      attrs.$observe('maxlength', function(maxlength) {
        maxlength = parseInt(maxlength);
        if (maxlength) {
          input.attr('maxlength', maxlength);
        }
      });
      $scope.$watch('value', function(value) {
        ngModel.$setViewValue(value);
      });
      ngModel.$render = function() {
        $scope.value = ngModel.$viewValue;
      };
      input
        .bind('blur', function() {
          $scope.editMode = false;
          $scope.$apply();
        })
        .bind('keydown', function() {
          $timeout(function() {
            input.width(getWidth());
          }, 0);
        })
        .bind('keyup', function() {
          $timeout(function() {
            input.width(getWidth());
          }, 0);
        })
        .bind('keypress', function(evt) {
          if (evt.charCode === 13) {
            $scope.editMode = false;
            $scope.$apply();
          }
        });
    }
  };
});
