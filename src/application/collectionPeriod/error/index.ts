import { FiscalPeriod } from "@prisma/client";
type NessaryField = Pick<
  FiscalPeriod,
  "startMonth" | "startYear" | "endMonth" | "endYear"
>;
function toFiscalPeriodErrorResponse(f: NessaryField) {
  return {
    startMonth: f.startMonth,
    endMonth: f.endMonth,
    startYear: f.startYear,
    endYear: f.endYear,
  };
}

export class CollectionPeriodOutOfRangError extends Error {
  statusCode: number;
  fiscalPeriod: NessaryField;
  constructor(
    fiscalPeriod: FiscalPeriod,
    message = "collectionPeriod must in range fiscalPeriod"
  ) {
    super(message);
    this.name = "COLLECTION_PERIOD_MONTH_YEAR_OUT_OF_RANGE";
    this.statusCode = 404;
    this.fiscalPeriod = toFiscalPeriodErrorResponse(fiscalPeriod);
  }
}
