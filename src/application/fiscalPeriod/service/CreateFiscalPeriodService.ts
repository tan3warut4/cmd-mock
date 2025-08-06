import { FiscalPeriod } from "@prisma/client";
import { IFiscalRepository } from "../../../domain/collectionPeriod/repositories/IFiscalRepository";
import { createFiscalPeriodDto } from "../dto/FiscalPeriodSchema";

export class CreateFiscalPeriodService {
  constructor(private repo: IFiscalRepository) {}

  async execute(data: createFiscalPeriodDto): Promise<FiscalPeriod> {
    return this.repo.create(data);
  }
}
