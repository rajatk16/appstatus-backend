import fastifyJwt from '@fastify/jwt';
import fastifyPlugin from 'fastify-plugin';

export const jwtPlugin = fastifyPlugin(async fastify => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'YOUR_JWT_SECRET',
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
