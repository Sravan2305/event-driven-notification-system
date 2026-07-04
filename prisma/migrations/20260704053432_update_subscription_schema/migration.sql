/*
  Warnings:

  - The `eventTypes` column on the `subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sources` column on the `subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "eventTypes",
ADD COLUMN     "eventTypes" TEXT[],
DROP COLUMN "sources",
ADD COLUMN     "sources" TEXT[];

-- CreateIndex
CREATE INDEX "subscriptions_enabled_idx" ON "subscriptions"("enabled");
