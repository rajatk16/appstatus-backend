import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export const prismaPlugin = fastifyPlugin(async fastify => {
  const prisma = new PrismaClient();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
