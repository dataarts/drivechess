'use strict';

angular.module('chessApp')
  .directive('piece', function () {
    return {
      template: '<div ng-class="position"></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
      	scope.position = attrs.position;
      }
    };
  });
