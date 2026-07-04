import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

import { dependencies } from "../../bootstrap/dependencies";

const subscriptionModule: FastifyPluginAsync = async (
  app
) => {
  app.post(
    "/subscriptions",
    dependencies.subscriptionController.create
  );

  app.get(
    "/subscriptions",
    dependencies.subscriptionController.getAll
  );
};

export default fp(subscriptionModule);