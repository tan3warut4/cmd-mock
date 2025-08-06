/*
  Warnings:

  - Added the required column `tenantId` to the `FiscalPeriod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FiscalPeriod" ADD COLUMN     "tenantId" TEXT NOT NULL;
