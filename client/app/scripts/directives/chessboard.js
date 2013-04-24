'use strict';

angular.module('chessApp')
  .directive('chessboard', function($log, $rootScope) {
    var i, j;
    var template = '';
    var letters = 'abcdefgh';
    for (i = 0; i < 8; i++) {
      var letter = letters[i];
      for (j = 0; j < 8; j++) {
        var id = (letter + (j + 1));
        var bindLast = 'ng-class="lastMove(\'' + id + '\')"'; 
        template += '<div id="' + id + '" class="cell droppable" ' + bindLast + ' ></div>\n';
     }
     for (j = 8; j < 12; j++) {
      template += '<div id="' + (letter + (j + 1)) + '" class="cell"></div>\n';
    }
  }
  return {
      template: template,
      restrict: 'E',
      replace: false,
      transclude: true,
      link: function postLink(scope, element, attrs) {

        scope.lastMove = function(id) {
          if(scope.history && scope.history.length > 0) {
            var move = scope.history.get(scope.history.length-1);
            var from = move.substring(0,2);
            var to = move.substring(2);
            if (id == from) {
              return 'from';
            } else if (id == to) {
              return 'to';
            }
          }
          return '';
        }

        element.find('.droppable').droppable({
          out: function(event, ui) {
            $(this).removeClass('highlight');
          },
          drop: function(event, ui) {
            var position = this.id;
            $(this).removeClass('highlight');
            ui.draggable.css({'top': '', 'left': ''});
            var pieces = element.find('.' + position);
            var dragId = ui.draggable[0].id;
            if (pieces.length > 1) {
              pieces.each(function(idx, piece) {
                if (piece.id !== dragId) {
                  scope.board.set(piece.id, 'captured');
                  // Detect if this was a game winner.
                  if (piece.id[0] === 'K') {
                    var color = piece.id[1] === 'W' ? 'Black' : 'White';
                    $log.info(color + ' wins');
                  }
                } else {
                }
              });
            }
            var from = ui.draggable.data('from');
            var to = position;
            if (from !== to) {
              scope.$emit('move', dragId, from, to);
            }
          },
          over: function(event, ui) {
            $(this).addClass('highlight');
            scope.board.set(ui.draggable[0].id, this.id);
            scope.$apply();
          }
        });

        function resize() {
          var hNav = 40;//$('.navbar-inner').height();
          var h = $(window).height() - hNav;
          var w = $(window).width();

          w = Math.min(w, h / 12 * 8);
          h = Math.min(h, w);

          var t = $(window).height() / 2 - h / 2 + hNav/2;
          var l = $(window).width() / 2 - w / 2;

          scope.style = {
            position: 'absolute',
            width: w + 'px',
            height: h + 'px',
            left: l + 'px',
            top: t + 'px'
          };
        }

        angular.element(window).bind('resize', function() {
          scope.$apply(resize);
        });

        resize();

      }
    };
  });
