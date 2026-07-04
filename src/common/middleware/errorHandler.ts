import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (
      error: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      request.log.error(error);

      reply.status(error.statusCode ?? 500).send({
        message: error.message,
      });
    }
  );
}
