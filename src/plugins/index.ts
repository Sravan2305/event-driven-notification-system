import type { FastifyInstance } from "fastify";

import cors from "@fastify/cors";
import sensible from "@fastify/sensible";

import { registerSwagger } from "./swagger";

export async function registerPlugins(app: FastifyInstance) {
  await app.register(cors);

  await app.register(sensible);

  await registerSwagger(app);
}