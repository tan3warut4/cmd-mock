-- CreateTable
CREATE TABLE "FiscalPeriod" (
    "id" TEXT NOT NULL,
    "name" JSONB,
    "startMonth" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FiscalPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionPeriod" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "isLock" BOOLEAN NOT NULL,
    "additionalInfo" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "fiscalPeriodId" TEXT NOT NULL,

    CONSTRAINT "CollectionPeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionPeriod" ADD CONSTRAINT "CollectionPeriod_fiscalPeriodId_fkey" FOREIGN KEY ("fiscalPeriodId") REFERENCES "FiscalPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
