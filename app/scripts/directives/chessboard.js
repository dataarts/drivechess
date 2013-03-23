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
            element.removeClass('highlight');
            console.log('out');
          },
          drop: function(event, ui) {
            console.log('drop');
          },
          over: function(event, ui) {
            element.addClass('highlight');
            console.log('over');
          }
        });
      }
    };
  });
