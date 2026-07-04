import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";

export class FanoutRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getPendingOutboxEvents() {
    return this.prisma.outboxEvent.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async getSubscriptions() {
    return this.prisma.subscription.findMany({
      where: {
        enabled: true,
      },
    });
  }

  async createDelivery(eventId: string, subscriptionId: string) {
    return this.prisma.delivery.create({
      data: {
        id: `del_${ulid()}`,
        eventId,
        subscriptionId,
        status: "PENDING",
      },
    });
  }

  async markDeliverySuccess(
    deliveryId: string,
    responseCode: number,
    responseBody: unknown
  ) {
    return this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "SUCCESS",
        responseCode,
        responseBody: JSON.stringify(responseBody),
      },
    });
  }

  async markDeliveryFailed(
    deliveryId: string,
    responseCode: number,
    responseBody: unknown
  ) {
    return this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: "FAILED",
        responseCode,
        responseBody: JSON.stringify(responseBody),
      },
    });
  }

  async markOutboxPublished(outboxId: string) {
    return this.prisma.outboxEvent.update({
      where: {
        id: outboxId,
      },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  }
}