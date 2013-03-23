'use strict';

angular.module('chessApp')
  .directive('piece', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
