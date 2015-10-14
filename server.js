const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.start(function() {
  console.log('Server running at:', server.info.uri);
});

// vim: set ts=2 sw=2 :
