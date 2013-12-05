'use strict';

describe('Service: Linkedin', function () {

  // load the service's module
  beforeEach(module('angularLinkedin'));

  // instantiate service
  var Linkedin;
  beforeEach(inject(function(_Linkedin_) {
    Linkedin = _Linkedin_;
  }));

  it('should do something', function () {
    expect(!!Linkedin).toBe(true);
  });

});
