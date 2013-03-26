'use strict';

describe('Directive: piece', function () {
  beforeEach(module('chessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<piece></piece>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the piece directive');
  }));
});
