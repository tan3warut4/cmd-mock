-- AlterTable

ALTER TABLE "CollectionPeriod"
ADD CONSTRAINT chk_month_year_ranges CHECK (
  "startMonth" BETWEEN 1 AND 12
  AND "endMonth" BETWEEN 1 AND 12
  AND "startYear" BETWEEN 1 AND 3000
  AND "endYear" BETWEEN 1 AND 3000
);

ALTER TABLE "FiscalPeriod"
ADD CONSTRAINT chk_month_year_ranges CHECK (
   "startMonth" BETWEEN 1 AND 12
  AND "endMonth" BETWEEN 1 AND 12
   AND "startYear" BETWEEN 1 AND 3000
  AND "endYear" BETWEEN 1 AND 3000
);



