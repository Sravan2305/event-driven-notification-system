import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { prisma } from "../../infrastructure/database/prisma";

export async function getHealth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}

export async function getLiveness(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send({
    status: "alive",
  });
}

export async function getReadiness(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return reply.send({
      status: "ready",
    });
  } catch {
    return reply.status(503).send({
      status: "not_ready",
    });
  }
}