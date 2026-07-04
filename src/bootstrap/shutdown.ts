import type { FastifyInstance } from "fastify";

import { logger } from "../common/logger/logger";
import { prisma } from "../infrastructure/database/prisma";

export function registerGracefulShutdown(app: FastifyInstance) {
  const shutdown = async (signal: string) => {
    logger.info({ signal }, "Shutting down server");

    await app.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}