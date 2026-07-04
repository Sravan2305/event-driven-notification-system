import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { SubscriptionService } from "./subscription.service";
import { createSubscriptionSchema } from "./subscription.schema";

export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const dto = createSubscriptionSchema.parse(request.body);

    const subscription =
      await this.subscriptionService.create(dto);

    return reply.code(201).send(subscription);
  };

  getAll = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const subscriptions =
      await this.subscriptionService.getAll();

    return reply.send(subscriptions);
  };
}