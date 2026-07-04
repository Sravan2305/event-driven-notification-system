import { FastifyReply, FastifyRequest } from "fastify";

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
  return reply.send({
    status: "ready",
  });
}