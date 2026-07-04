import { ulid } from "ulid";

import { Subscription } from "@prisma/client";

import { CreateSubscriptionDto } from "./subscription.schema";
import { SubscriptionRepository } from "./subscription.repository";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async create(
    dto: CreateSubscriptionDto
  ): Promise<Subscription> {
    return this.subscriptionRepository.create(
      `sub_${ulid()}`,
      dto
    );
  }

  async getAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.findAll();
  }
}