import crypto from "node:crypto";

import Fastify from "fastify";

import { logger } from "./common/logger/logger";
import { registerErrorHandler } from "./common/middleware/errorHandler";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";

export async function buildApp() {
  const app = Fastify({
    loggerInstance: logger,

    requestIdHeader: "x-request-id",

    genReqId(req) {
      return req.headers["x-request-id"]?.toString() ?? crypto.randomUUID();
    },
  });

  await registerPlugins(app);

  await registerRoutes(app);

  registerErrorHandler(app);

  return app;
}