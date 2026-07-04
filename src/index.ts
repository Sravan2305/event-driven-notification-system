import "./config/loadEnv";

import { buildApp } from "./app";
import { registerGracefulShutdown } from "./bootstrap/shutdown";
import { logger } from "./common/logger/logger";
import { env } from "./config";
import { FanoutWorker } from "./workers/fanout.worker";

async function start() {
  try {
    const app = await buildApp();

    registerGracefulShutdown(app);

    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });
    const fanoutWorker = new FanoutWorker();

    void fanoutWorker.start();

    logger.info(
      {
        port: env.PORT,
        env: env.NODE_ENV,
      },
      "Server started"
    );
  } catch (err) {
    logger.error({ err }, "Failed to start server");

    process.exit(1);
  }
}

void start();