-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventCategory" ADD VALUE 'BUSINESS_MEETING';
ALTER TYPE "EventCategory" ADD VALUE 'CONFERENCE';
ALTER TYPE "EventCategory" ADD VALUE 'SEMINAR';
ALTER TYPE "EventCategory" ADD VALUE 'WORKSHOP';
ALTER TYPE "EventCategory" ADD VALUE 'NETWORKING';
ALTER TYPE "EventCategory" ADD VALUE 'PRODUCT_LAUNCH';
ALTER TYPE "EventCategory" ADD VALUE 'TEAM_BUILDING';
ALTER TYPE "EventCategory" ADD VALUE 'COMPANY_RETREAT';
ALTER TYPE "EventCategory" ADD VALUE 'BOARD_MEETING';
ALTER TYPE "EventCategory" ADD VALUE 'TRAINING_SESSION';
