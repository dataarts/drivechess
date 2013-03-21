'use strict';

describe('Directive: chessboard', function () {
  beforeEach(module('chessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<chessboard></chessboard>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the chessboard directive');
  }));
});
