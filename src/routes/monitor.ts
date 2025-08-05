import { z } from "zod";
import { FastifyPluginAsync } from "fastify";

export const createMonitorSchema = z.object({
  name: z.string().trim().min(1, { message: "Name, if provided, must be at least 1 character long" }).optional(),
  url: z.url({
    message: "Please provide a valid URL (e.g. https://www.example.com)"
  }),
  interval: z.number().min(10).max(3600).describe("Interval in seconds (min: 10, max: 3600)")
});

const monitorRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/monitors", async (req, reply) => {
    const body = createMonitorSchema.parse(req.body);
    const userId = "a33f2c7f-d650-4b2d-bdaf-1cd77f8a8184";
    const monitor = await fastify.prisma.monitor.create({
      data: {
        ...body,
        userId
      }
    });
    return reply.code(201).send(monitor);
  })

  fastify.get("/monitors", async (req, reply) => {
    const userId = "a33f2c7f-d650-4b2d-bdaf-1cd77f8a8184";
    const monitors = await fastify.prisma.monitor.findMany({
      where: {
        userId
      }
    });
    return reply.send(monitors);
  })

  fastify.get("/monitors/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const monitor = await fastify.prisma.monitor.findUnique({
      where: { id }
    });
    if (!monitor) {
      return reply.code(404).send({ error: "Monitor not found" });
    }
    return reply.send(monitor);
  });

  fastify.put("/monitors/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const updateSchema = createMonitorSchema.partial();
    const updates = updateSchema.parse(req.body);
    const monitor = await fastify.prisma.monitor.update({
      where: { id },
      data: updates
    });
    return reply.send(monitor);
  });

  fastify.delete("/monitors/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await fastify.prisma.monitor.delete({
      where: { id }
    });
    return reply.code(204).send();
  });
};

export default monitorRoutes;