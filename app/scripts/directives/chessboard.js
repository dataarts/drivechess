'use strict';

angular.module('chessApp')
  .directive('chessboard', function () {
    return {
      templateUrl: 'scripts/directives/chessboard.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the chessboard directive');
      }
    };
  });
