'use strict';

describe('Service: problem', function () {

  // load the service's module
  beforeEach(module('smartLearnIoApp'));

  // instantiate service
  var problem;
  beforeEach(inject(function (_problem_) {
    problem = _problem_;
  }));

  it('should do something', function () {
    expect(!!problem).toBe(true);
  });

});
