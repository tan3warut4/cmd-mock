import { IFiscalRepository } from "../../domain/collectionPeriod/repositories/IFiscalRepository";
import { createFiscalPeriodDto } from "../../application/fiscalPeriod/dto/FiscalPeriodSchema";
import { DatabaseClient } from "../database/DatabaseClient";
import { FiscalPeriod } from "@prisma/client";
import { SortDirection } from "../../shared/types/sortDirection";

export class PrismaFiscalPeriodRepository implements IFiscalRepository {
  private readonly prisma = DatabaseClient.getInstance();

  getAll(orderBy: Record<string, SortDirection>[]): Promise<FiscalPeriod[]> {
    return this.prisma.fiscalPeriod.findMany({
      orderBy: orderBy,
    });
  }

  async getById(id: string): Promise<FiscalPeriod | null> {
    return this.prisma.fiscalPeriod.findUnique({ where: { id: id } });
  }

  async create(payload: createFiscalPeriodDto): Promise<FiscalPeriod> {
    const result = await this.prisma.fiscalPeriod.create({
      data: {
        ...payload,
      },
    });

    return result;
  }
}
