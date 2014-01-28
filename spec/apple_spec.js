var expect = require('chai').expect;
var sinon = require('sinon');

var Apple = require('../src/apple').Apple;


describe("Apple", function() {
  it("appears in a random place on the board", function() {
    sinon.stub(Math, 'random', function rand() {
      rand.num = rand.num || 0.0;
      return rand.num += 0.1;
    });
    var a1 = new Apple(10, 10);
    var a2 = new Apple(10, 10);
    expect(a1.getPosition().x).to.be.lessThan(a2.getPosition().x);
  });

  xit("should not spawn on top of the snake's body");
});

