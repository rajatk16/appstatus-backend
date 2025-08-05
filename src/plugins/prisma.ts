import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default fp(async (fastify: FastifyInstance, _opts: FastifyPluginOptions) => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  fastify.decorate("prisma", prisma);
});

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
