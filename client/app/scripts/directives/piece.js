'use strict';

angular.module('chessApp')
  .directive('piece', function($rootScope, $log) {
    return {
<<<<<<< HEAD:app/scripts/directives/piece.js
      template: '<div ng-class="board.get(id)"></div>',
      //template: '<object data="images/pawn.svg" ng-class="board.get(id)" type="image/svg+xml"></object>',
=======
      template: '<div class="piece animated" ng-class="board.get(id)"></div>',
>>>>>>> e4174fdadaa16847252166bcdff828c08df32279:client/app/scripts/directives/piece.js
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
            //console.log('start');
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
