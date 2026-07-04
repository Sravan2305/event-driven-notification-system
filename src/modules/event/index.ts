import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

import { dependencies } from "../../bootstrap/dependencies";

const eventModule: FastifyPluginAsync = async (app) => {
  app.post(
    "/events",
    dependencies.eventController.create
  );
};

export default fp(eventModule);