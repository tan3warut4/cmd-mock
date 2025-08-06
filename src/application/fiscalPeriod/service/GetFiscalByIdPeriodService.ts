import { FiscalPeriod } from "@prisma/client";
import { IFiscalRepository } from "../../../domain/collectionPeriod/repositories/IFiscalRepository";
import { FiscalNotFoundError } from "../error";

export class GetFiscalByIdPeriodService {
  constructor(private repo: IFiscalRepository) {}

  async execute(id: string): Promise<FiscalPeriod> {
    const data = await this.repo.getById(id);
    if (!data) {
      throw new FiscalNotFoundError(id);
    }
    return data;
  }
}
