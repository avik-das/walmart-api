const Hapi = require('hapi');
const joi = require('joi');

const search = require('./search');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/search',
  config: {
    validate: {
      query: {
        keyword: joi.string().required()
      }
    }
  },
  handler: function(request, reply) {
    reply({
      results: search.searchByKeyword(request.query.keyword)
    });
  }
});

server.start(function() {
  console.log('caching product data...');
  search.init()
    .then(function() {
      console.log('cached!');
      console.log('Server running at:', server.info.uri);
    });
});

module.exports = server;

// vim: set ts=2 sw=2 :
