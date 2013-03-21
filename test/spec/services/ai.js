'use strict';

describe('Service: ai', function () {

  // load the service's module
  beforeEach(module('chessApp'));

  // instantiate service
  var ai;
  beforeEach(inject(function (_ai_) {
    ai = _ai_;
  }));

  it('should do something', function () {
    expect(!!ai).toBe(true);
  });

});
