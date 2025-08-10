import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const createMonitorSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']).default('GET'),
  expectedStatus: z.number().optional(),
  interval: z.number().min(10),
  alertConfig: z
    .object({
      email: z.email().optional(),
      webhookUrl: z.url().optional(),
    })
    .optional(),
});

export const monitorRoutes = async (app: FastifyInstance) => {
  app.post('/', { preHandler: [app.authenticate] }, async (req, reply) => {
    const parsed = createMonitorSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send(z.treeifyError(parsed.error));
    }

    const { name, url, method, expectedStatus, interval, alertConfig } = parsed.data;
    const now = new Date();

    const monitor = await app.prisma.monitor.create({
      data: {
        name,
        url,
        method,
        expectedStatus,
        interval,
        nextCheckAt: new Date(now.getTime() + interval * 1000),
        userId: req.user.id,
        alertConfig: alertConfig
          ? {
              create: {
                email: alertConfig.email,
                webhookUrl: alertConfig.webhookUrl,
              },
            }
          : undefined,
      },
      include: {
        alertConfig: true,
      },
    });

    return reply.code(201).send(monitor);
  });
};
