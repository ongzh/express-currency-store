/*
  Warnings:

  - You are about to drop the column `baseCurrency` on the `ExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `quoteCurrency` on the `ExchangeRate` table. All the data in the column will be lost.
  - Added the required column `baseCurrencyId` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetCurrencyId` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExchangeRate" DROP COLUMN "baseCurrency",
DROP COLUMN "quoteCurrency",
ADD COLUMN     "baseCurrencyId" INTEGER NOT NULL,
ADD COLUMN     "targetCurrencyId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Currency";

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "isCrypto" BOOLEAN NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_baseCurrencyId_fkey" FOREIGN KEY ("baseCurrencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_targetCurrencyId_fkey" FOREIGN KEY ("targetCurrencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
