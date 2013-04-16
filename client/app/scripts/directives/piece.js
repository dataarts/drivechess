'use strict';

angular.module('chessApp')
  .directive('piece', function($rootScope, $log) {
    return {
      template: '<div class="piece animated" ng-class="board.get(id)"></div>',
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
            element.removeClass('animated');
            var position = this.className.split(' ').filter(function(x) {return x.length == 2})[0];
            $(this).data('from', position);
          },
          stop: function(event, ui) {
            element.addClass('animated');
            //console.log('stop');
          },
          drag: function(event, ui) {
            //console.log('drag');
          }
        });
      }
    };
  });
