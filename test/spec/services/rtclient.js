'use strict';

describe('Service: rtclient', function () {

  // load the service's module
  beforeEach(module('chessApp'));

  // instantiate service
  var rtclient;
  beforeEach(inject(function (_rtclient_) {
    rtclient = _rtclient_;
  }));

  it('should do something', function () {
    expect(!!rtclient).toBe(true);
  });

});
