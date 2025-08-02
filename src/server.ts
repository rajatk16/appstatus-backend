import fastify from "fastify";

const app = fastify({
  logger: true,
});

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
