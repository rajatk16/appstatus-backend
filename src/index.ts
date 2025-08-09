import Fastify from 'fastify';

import { authRoutes, healthRoute } from './routes';
import { jwtPlugin, prismaPlugin } from './plugins';

const buildServer = () => {
  const app = Fastify({
    logger: true,
  });

  // Plugins
  app.register(prismaPlugin);
  app.register(jwtPlugin);

  // Routes
  app.register(authRoutes, { prefix: '/auth' });
  app.register(healthRoute, { prefix: '/health' });

  return app;
};

const start = async () => {
  const app = buildServer();
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
