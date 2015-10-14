require('mocha');
const chai = require('chai');

const server = require('../server');

describe('GET /search', function() {
  it('returns a list of matching products', function(done) {
    server.inject({
      method: 'GET',
      url: '/search?keyword=backpack',
    }, function(response) {
      try {
        chai.expect(response.statusCode).to.equal(200);
        chai.expect(response.result).to.eql({
          results: [
            // TODO
          ]
        });
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
