import fastify from "fastify";

import prismaPlugin from "./plugins/prisma";
import monitorRoutes from "./routes/monitor";

const app = fastify({
  logger: true,
});

app.register(prismaPlugin);
app.register(monitorRoutes, { prefix: "/api" });

app.get("/", async () => {
  return {
    status: "ok",
    message: "AppStatus API is running",
  };
});

app.listen({ port: 3000 }, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
