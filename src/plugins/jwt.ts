import fastifyJwt from '@fastify/jwt';
import fastifyPlugin from 'fastify-plugin';

export const jwtPlugin = fastifyPlugin(async fastify => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'YOUR_JWT_SECRET',
  });

  fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string;
      email: string;
    };
    user: {
      id: string;
      email: string;
    };
  }
}
