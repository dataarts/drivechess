'use strict';

describe('Service: chessengine', function () {

  // load the service's module
  beforeEach(module('chessApp'));

  // instantiate service
  var chessengine;
  beforeEach(inject(function (_chessengine_) {
    chessengine = _chessengine_;
  }));

  it('should do something', function () {
    expect(!!chessengine).toBe(true);
  });

});
