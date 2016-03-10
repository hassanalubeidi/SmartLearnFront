'use strict';

describe('Service: jsonApi', function () {

  // load the service's module
  beforeEach(module('smartLearnIoApp'));

  // instantiate service
  var jsonApi;
  beforeEach(inject(function (_jsonApi_) {
    jsonApi = _jsonApi_;
  }));

  it('should do something', function () {
    expect(!!jsonApi).toBe(true);
  });

});
