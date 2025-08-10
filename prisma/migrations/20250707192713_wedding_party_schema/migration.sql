/*
  Warnings:

  - The values [CONFERENCE,WORKSHOP,MEETUP,CONCERT,FESTIVAL,SPORTS,EXHIBITION,NETWORKING,PARTY] on the enum `EventCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [FREE,REGULAR,EARLY_BIRD,STUDENT,GROUP] on the enum `TicketType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventCategory_new" AS ENUM ('WEDDING', 'RECEPTION', 'ENGAGEMENT_PARTY', 'BIRTHDAY_PARTY', 'ANNIVERSARY', 'BABY_SHOWER', 'BRIDAL_SHOWER', 'GRADUATION', 'HOLIDAY_PARTY', 'CORPORATE_EVENT', 'REUNION', 'OTHER');
ALTER TABLE "events" ALTER COLUMN "category" TYPE "EventCategory_new" USING ("category"::text::"EventCategory_new");
ALTER TYPE "EventCategory" RENAME TO "EventCategory_old";
ALTER TYPE "EventCategory_new" RENAME TO "EventCategory";
DROP TYPE "EventCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TicketType_new" AS ENUM ('GUEST', 'PLUS_ONE', 'FAMILY', 'CHILD', 'VIP', 'VENDOR', 'STAFF');
ALTER TABLE "tickets" ALTER COLUMN "ticketType" TYPE "TicketType_new" USING ("ticketType"::text::"TicketType_new");
ALTER TYPE "TicketType" RENAME TO "TicketType_old";
ALTER TYPE "TicketType_new" RENAME TO "TicketType";
DROP TYPE "TicketType_old";
COMMIT;

-- AlterTable
ALTER TABLE "attendees" ADD COLUMN     "hasPlusOne" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mealPreference" TEXT,
ADD COLUMN     "plusOneName" TEXT,
ADD COLUMN     "rsvpStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "specialNeeds" TEXT,
ADD COLUMN     "tableNumber" INTEGER;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "coupleName" TEXT,
ADD COLUMN     "dressCode" TEXT,
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "giftRegistry" TEXT,
ADD COLUMN     "hostName" TEXT,
ADD COLUMN     "isPlusOneAllowed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mealPreferences" TEXT[],
ADD COLUMN     "rsvpDeadline" TIMESTAMP(3),
ADD COLUMN     "specialInstructions" TEXT,
ADD COLUMN     "startTime" TEXT NOT NULL,
ALTER COLUMN "ticketPrice" SET DEFAULT 0;
