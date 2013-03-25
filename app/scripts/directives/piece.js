'use strict';

angular.module('chessApp')
  .directive('piece', function($rootScope, $log) {
    return {
      template: '<div ng-class="game.board[id]"></div>',
      restrict: 'E',
      replace: true,
      scope: 'isolate',
      link: function postLink(scope, element, attrs) {
        scope.id = element[0].id;
        var containerWidth = element.parent().width();
        var grid = containerWidth / 8.0;
        element.draggable({
          // containment: 'parent',
          // grid: [grid, grid],
          // revert: true,
          snap: '.cell',
          cursor: 'move',
          zIndex: 100,
          start: function(event, ui) {
            console.log('start');
          },
          stop: function(event, ui) {
            console.log('stop');
          },
          drag: function(event, ui) {
            console.log('drag');
          }
        });
      }
    };
  });
