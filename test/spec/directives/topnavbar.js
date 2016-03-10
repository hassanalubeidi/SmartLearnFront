'use strict';

describe('Directive: topNavbar', function () {

  // load the directive's module
  beforeEach(module('smartLearnIoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<top-navbar></top-navbar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the topNavbar directive');
  }));
});
