'use strict';

describe('Service: Distill', function () {

  // load the service's module
  beforeEach(module('distillDnaApp'));

  // instantiate service
  var Distill;
  beforeEach(inject(function(_Distill_) {
    Distill = _Distill_;
  }));

  it('should do something', function () {
    expect(!!Distill).toBe(true);
  });

});
