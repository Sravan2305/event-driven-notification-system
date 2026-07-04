import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

import {
  getHealth,
  getLiveness,
  getReadiness,
} from "./controller";

const healthModule: FastifyPluginAsync = async (app) => {
  app.get("/health", getHealth);
  app.get("/health/live", getLiveness);
  app.get("/health/ready", getReadiness);
};

export default fp(healthModule);