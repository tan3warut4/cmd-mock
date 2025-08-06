import { FiscalPeriod } from "@prisma/client";
import { createFiscalPeriodDto } from "../../../application/fiscalPeriod/dto/FiscalPeriodSchema";
import { SortDirection } from "../../../shared/types/sortDirection";

export interface IFiscalRepository {
  create(payload: createFiscalPeriodDto): Promise<FiscalPeriod>;
  getAll(orderBy: Record<string, SortDirection>[]): Promise<FiscalPeriod[]>;
  getById(id: string): Promise<FiscalPeriod | null>;
}
