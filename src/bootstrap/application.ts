const prisma = new PrismaClient();

const subscriptionRepository =
    new SubscriptionRepository(prisma);

const subscriptionService =
    new SubscriptionService(subscriptionRepository);

const subscriptionController =
    new SubscriptionController(subscriptionService);

export const application = {
    subscriptionController,
};