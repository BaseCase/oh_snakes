var expect = require('chai').expect;
var snaeks = require('./snaeks').snaeks;


describe("snaek!", function() {
  it('rocks', function() {
    expect(snaeks()).to.be.a('string');
  });
});

