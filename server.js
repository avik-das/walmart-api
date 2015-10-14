const Hapi = require('hapi');
const joi = require('joi');

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
      results: [
        // TODO
      ]
    });
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});

module.exports = server;

// vim: set ts=2 sw=2 :
