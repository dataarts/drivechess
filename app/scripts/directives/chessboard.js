'use strict';

angular.module('chessApp')
  .directive('chessboard', function() {
    var i, j, template;
    var letters = 'abcdefgh';
    for (i = 0; i < 8; i++) {
      var letter = letters[i];
      for (j = 0; j < 8; j++) {
        template += '<div id="' + (letter + (j + 1)) + '"></div>\n';
      }
    }
    return {
      template: template,
      restrict: 'E',
      replace: false,
      transclude: true,
      link: function postLink(scope, element, attrs) {
      }
    };
  });
