'use strict';

angular.module('chessApp')
  .directive('piece', function() {
    return {
      template: '<div ng-class="position"></div>',
      restrict: 'E',
      replace: true,
      scope: 'isolate',
      link: function postLink(scope, element, attrs) {
        var containerWidth = element.parent().width();
        var grid = containerWidth / 8.0;
        console.log(containerWidth, grid);
        scope.position = attrs.position;
        element.draggable({
          // containment: 'parent',
          grid: [grid, grid],
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
