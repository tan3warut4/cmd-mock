export class FiscalNotFoundError extends Error {
  statusCode: number;
  id: string;
  constructor(id: string, message = "fiscalPeriodId not found") {
    super(message);
    this.name = "FISCAL_NOT_FOUND";
    this.statusCode = 404;
    this.id = id;
  }
}
