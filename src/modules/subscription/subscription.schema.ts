import { z } from "zod";

export const createSubscriptionSchema = z.object({
  webhookUrl: z.string().url(),

  eventTypes: z.array(z.string()).min(1),

  sources: z.array(z.string()).min(1),

  payloadFilters: z.record(z.string(), z.unknown()).optional(),
});

export type CreateSubscriptionDto = z.infer<
  typeof createSubscriptionSchema
>;