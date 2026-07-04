import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";

import type { CreateEventDto } from "./event.schema";

export class EventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateEventDto) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          id: `evt_${ulid()}`,
          eventType: dto.eventType,
          source: dto.source,
          payload: dto.payload,
          status: "ACCEPTED",
        },
      });

      const outbox = await tx.outboxEvent.create({
        data: {
          id: `out_${ulid()}`,
          eventId: event.id,
          status: "PENDING",
        },
      });

      return {
        event,
        outbox,
      };
    });
  }
}