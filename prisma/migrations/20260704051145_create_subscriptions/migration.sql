-- CreateTable
CREATE TABLE "subscriptions" (
    "id" VARCHAR(30) NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "eventTypes" JSONB NOT NULL,
    "sources" JSONB NOT NULL,
    "payloadFilters" JSONB,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);
