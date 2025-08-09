import { FastifyInstance } from 'fastify';

export const healthRoute = async (app: FastifyInstance) => {
  app.get('/', async () => {
    const dbCheck = await app.prisma.$queryRaw`SELECT 1 as ok`;
    return {
      status: 'ok',
      database: dbCheck ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    };
  });
};
