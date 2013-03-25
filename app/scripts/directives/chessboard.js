'use strict';

angular.module('chessApp')
  .directive('chessboard', function() {
    var i, j;
    var template = '';
    var letters = 'abcdefgh';
    for (i = 0; i < 8; i++) {
      var letter = letters[i];
      for (j = 0; j < 8; j++) {
        template += '<div id="' + (letter + (j + 1)) + '" class="cell"></div>\n';
      }
    }
    return {
      template: template,
      restrict: 'E',
      replace: false,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        element.find('.cell').droppable({
          out: function(event, ui) {
            $(this).removeClass('highlight');
          },
          drop: function(event, ui) {
            $(this).removeClass('highlight');
            ui.draggable.css({'top': '', 'left': ''});
          },
          over: function(event, ui) {
            $(this).addClass('highlight');
            console.log('scope board', scope.board);
            scope.board.set(ui.draggable[0].id, this.id);
            scope.$apply();
          }
        });
        $('body').droppable({
          over: function(event, ui) {
            scope.board.set(ui.draggable[0].id, 'offscreen');
            scope.$apply();
          }
        });
      }
    };
  });
