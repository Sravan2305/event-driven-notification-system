import { WebhookClient } from "../../infrastructure/http/webhook.client";
import { FanoutRepository } from "./fanout.repository";

export class FanoutService {
  constructor(
    private readonly repository: FanoutRepository
  ) {}

  private readonly webhookClient = new WebhookClient();

  async processPendingEvents() {
    const outboxEvents =
      await this.repository.getPendingOutboxEvents();

    for (const outbox of outboxEvents) {
      const event = outbox.event;

      const subscriptions =
        await this.repository.getSubscriptions();

      for (const subscription of subscriptions) {
        const eventTypeMatches =
          subscription.eventTypes.includes(event.eventType);

        const sourceMatches =
          subscription.sources.includes(event.source);

        if (!eventTypeMatches || !sourceMatches) {
          continue;
        }

        const delivery =
          await this.repository.createDelivery(
            event.id,
            subscription.id
          );

        const result =
          await this.webhookClient.deliver(
            subscription.webhookUrl,
            event
          );

        if (result.success) {
          await this.repository.markDeliverySuccess(
            delivery.id,
            result.statusCode,
            result.responseBody
          );
        } else {
          await this.repository.markDeliveryFailed(
            delivery.id,
            result.statusCode,
            result.responseBody
          );
        }
      }

      await this.repository.markOutboxPublished(outbox.id);
    }

    return {
      processed: outboxEvents.length,
    };
  }
}