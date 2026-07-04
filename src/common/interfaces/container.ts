import type { AwilixContainer } from "awilix";

import type { SubscriptionController } from "../../modules/subscription/subscription.controller";
import type { SubscriptionRepository } from "../../modules/subscription/subscription.repository";
import type { SubscriptionService } from "../../modules/subscription/subscription.service";

export interface AppContainer extends AwilixContainer {
  cradle: {
    subscriptionRepository: SubscriptionRepository;
    subscriptionService: SubscriptionService;
    subscriptionController: SubscriptionController;
  };
}