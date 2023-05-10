const Hapi = require('@hapi/hapi');
const path = require('path');

const init = async () => {
  const server = new Hapi.server({
    port: 8000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'app')
      }
    }
  });

  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
      directory: {
        path: '.',
      },
    },
  });

  server.route({
    method:'GET',
    path:'/',
    handler: (req, h) => {
      return h.file('./index.html');
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();