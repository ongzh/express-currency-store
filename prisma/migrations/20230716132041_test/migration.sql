/*
  Warnings:

  - You are about to drop the column `time` on the `ExchangeRate` table. All the data in the column will be lost.
  - Added the required column `timeStamp` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExchangeRate" DROP COLUMN "time",
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rate" SET DATA TYPE TEXT;
