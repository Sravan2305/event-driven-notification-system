import type { FastifyInstance } from "fastify";

import healthModule from "../modules/health";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthModule);
}