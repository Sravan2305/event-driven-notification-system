import { PrismaClient } from "@prisma/client";

import { EventController } from "../modules/event/event.controller";
import { EventRepository } from "../modules/event/event.repository";
import { EventService } from "../modules/event/event.service";

import { SubscriptionController } from "../modules/subscription/subscription.controller";
import { SubscriptionRepository } from "../modules/subscription/subscription.repository";
import { SubscriptionService } from "../modules/subscription/subscription.service";
import { FanoutRepository } from "../modules/fanout/fanout.repository";
import { FanoutService } from "../modules/fanout/fanout.service";

const prisma = new PrismaClient({
  log: ["warn", "error"],
});

const subscriptionRepository = new SubscriptionRepository(prisma);
const subscriptionService = new SubscriptionService(subscriptionRepository);
const subscriptionController = new SubscriptionController(subscriptionService);

const eventRepository = new EventRepository(prisma);
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

const fanoutRepository = new FanoutRepository(prisma);

const fanoutService = new FanoutService(
  fanoutRepository
);

export const dependencies = {
  prisma,

  subscriptionRepository,
  subscriptionService,
  subscriptionController,

  eventRepository,
  eventService,
  eventController,

  fanoutRepository,
fanoutService,
};