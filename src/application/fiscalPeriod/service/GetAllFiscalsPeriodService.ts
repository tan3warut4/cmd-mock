import { FiscalPeriod } from "@prisma/client";
import { IFiscalRepository } from "../../../domain/collectionPeriod/repositories/IFiscalRepository";
import { SortDirection } from "../../../shared/types/sortDirection";

export class GetAllFiscalPeriodService {
  constructor(private repo: IFiscalRepository) {}

  async execute(
    orderBy: Record<string, SortDirection>[]
  ): Promise<FiscalPeriod[]> {
    return this.repo.getAll(orderBy);
  }
}
