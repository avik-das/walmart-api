require('mocha');
const sinon = require('sinon');
const chai = require('chai');

const bluebird = require('bluebird');

const search = require('../search');

describe('GET /search', function() {
  var sandbox;
  var server;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    // Don't get real data, do nothing
    sandbox.stub(search, 'init').returns(bluebird.resolve());
    server = require('../server');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('returns a list of matching products', function(done) {
    server.inject({
      method: 'GET',
      url: '/search?keyword=backpack',
    }, function(response) {
      try {
        chai.expect(response.statusCode).to.equal(200);
        chai.expect(response.result).to.contain.keys('results');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('validates the presence of a keyword', function(done) {
    server.inject({
      method: 'GET',
      url: '/search',
    }, function(response) {
      try {
        chai.expect(response.statusCode).to.equal(400);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});

// vim: set ts=2 sw=2 :
