'use strict';

angular.module('chessApp')
  .directive('chessboard', function($log) {
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
            var position = this.id;
            $(this).removeClass('highlight');
            ui.draggable.css({'top': '', 'left': ''});
            var pieces = element.find('.' + position);
            if (pieces.length > 1) {
              var dragId = ui.draggable[0].id;
              pieces.each(function(idx, piece) {
                if (piece.id != dragId) {
                  scope.board.set(piece.id, 'captured');
                  // Detect if this was a game winner.
                  if (piece.id[0] == 'K') {
                    var color = piece.id[1] === 'W' ? 'Black' : 'White';
                    $log.info(color + ' wins');
                  }
                }
              });
            }
          },
          over: function(event, ui) {
            $(this).addClass('highlight');
            scope.board.set(ui.draggable[0].id, this.id);
            scope.$apply();
          }
        });
      }
    };
  });
