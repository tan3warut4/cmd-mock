/*
  Warnings:

  - A unique constraint covering the columns `[fiscalPeriodId,startMonth,endMonth,startYear,endYear]` on the table `CollectionPeriod` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CollectionPeriod_fiscalPeriodId_startMonth_endMonth_startYe_key" ON "CollectionPeriod"("fiscalPeriodId", "startMonth", "endMonth", "startYear", "endYear");
