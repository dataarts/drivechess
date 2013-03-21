'use strict';

angular.module('chessApp')
  .directive('chessboard', function () {
    return {
      templateUrl: 'views/chessboard.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the chessboard directive');
      }
    };
  });
