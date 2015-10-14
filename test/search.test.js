require('mocha');
const sinon = require('sinon');
const chai = require('chai');

const bluebird = require('bluebird');

const search = require('../search');

describe('#getCachedAPIData', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('returns a list of valid product data', function(done) {
    const getStub = sandbox.stub(search.internal, 'getAPIDataForId')

    getStub
      .withArgs(100)
      .returns(bluebird.resolve({}));

    getStub
      .withArgs(200)
      .returns(bluebird.resolve({
        longDescription: 'long-description-200'
      }));

    getStub
      .withArgs(300)
      .returns(bluebird.resolve(null));

    search.internal.getCachedAPIData([100, 200, 300])
      .then(function(cached) {
        chai.expect(cached).to.eql([{
          longDescription: 'long-description-200'
        }]);
      })
      .nodeify(done);
  });
});

describe('#searchByKeyword', function() {
  var sandbox;

  beforeEach(function(done) {
    sandbox = sinon.sandbox.create();

    sandbox.stub(search.internal, 'getCachedAPIData')
      .returns(bluebird.resolve([
        { 'longDescription': 'start backpack end 1' },
        { 'longDescription': 'start other end 1' },
        { 'longDescription': 'start Backpack end 2' }, // uppercase in keyword
        { 'longDescription': 'start other end 2' }
      ]));

    search.init().nodeify(done);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('returns a list of matching products', function() {
    const matching = search.searchByKeyword('BACKPACK');
    chai.expect(matching).to.eql([
      { 'longDescription': 'start backpack end 1' },
      { 'longDescription': 'start Backpack end 2' }
    ]);
  });
});

// vim: set ts=2 sw=2 :
