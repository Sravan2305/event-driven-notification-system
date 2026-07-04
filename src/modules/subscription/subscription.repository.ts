import { PrismaClient, Subscription } from "@prisma/client";

import { CreateSubscriptionDto } from "./subscription.schema";

export class SubscriptionRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async create(
    id: string,
    dto: CreateSubscriptionDto
  ): Promise<Subscription> {
    return this.prisma.subscription.create({
      data: {
        id,
        ...dto,
      },
    });
  }

  async findAll(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}