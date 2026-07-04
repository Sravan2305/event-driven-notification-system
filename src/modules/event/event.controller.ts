import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { createEventSchema } from "./event.schema";
import { EventService } from "./event.service";

export class EventController {
  constructor(
    private readonly eventService: EventService
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const dto = createEventSchema.parse(request.body);

    const result = await this.eventService.create(dto);

    return reply.code(202).send({
      eventId: result.event.id,
      status: result.event.status,
    });
  };
}