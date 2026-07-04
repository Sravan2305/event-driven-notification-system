import type { FastifyInstance } from "fastify";

// import eventModule from "../modules/event";
import healthModule from "../modules/health";
import subscriptionModule from "../modules/subscription";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthModule);

  // await app.register(eventModule);

  await app.register(subscriptionModule);
}