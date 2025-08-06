import { CollectionPeriod, FiscalPeriod, PrismaClient } from "@prisma/client";
import { ICollectionPeriodRepository } from "../../domain/collectionPeriod/repositories/ICollectionPeriodRepository";
import { createCollectionPeriodDto } from "../../application/collectionPeriod/dto/CollectionPeriodDTO";
import { getMonthRangeLabel, getMonthRangeLabelWithName } from "../../shared/utils/dateUtils";
import { DatabaseClient } from "../database/DatabaseClient";

export class PrismaCollectionPeriodRepository
  implements ICollectionPeriodRepository {
  private readonly prisma = DatabaseClient.getInstance();

  async create(period: createCollectionPeriodDto): Promise<CollectionPeriod> {
    const result = await this.prisma.collectionPeriod.create({
      data: {
        fiscalPeriodId: period.fiscalPeriodId,
        name: period.name,
        startMonth: period.startMonth,
        startYear: period.startYear,
        endMonth: period.endMonth,
        endYear: period.endYear,
        isOnline: period.isOnline,
        isLock: period.isLock,
        additionalInfo: period.additionalInfo,
        createdBy: period.createdBy,
      },
    });

    return result;
  }

  async findAll(): Promise<{ data: CollectionPeriod[]; total: number }> {
    return { data: [], total: 0 }; // Implement this logic next
  }

  async findGroupedByFiscal({
    tenantId,
    limit,
    cursor,
  }: {
    tenantId: string;
    limit: number;
    cursor?: string;
  }) {
    const fiscalPeriods = await this.prisma.fiscalPeriod.findMany({
      where: {
        tenantId,
        ...(cursor ? { id: { lt: cursor } } : {}),
      },
      include: { collectionPeriods: true },
      orderBy: { id: "desc" },
      take: limit + 1,
    });

    const hasMore = fiscalPeriods.length > limit;
    const result = hasMore ? fiscalPeriods.slice(0, limit) : fiscalPeriods;

    return {
      data: result.map(
        (fiscal: FiscalPeriod & { collectionPeriods: CollectionPeriod[] }) => ({
          fiscalPeriodId: fiscal.id,
          fiscalPeriod: getMonthRangeLabelWithName(
            fiscal.startMonth,
            fiscal.startYear,
            fiscal.endMonth,
            fiscal.endYear
          ),
          collectionPeriods: fiscal.collectionPeriods.map((cp) => ({
            id: cp.id,
            name: cp.name as Record<string, string>,
            term: getMonthRangeLabel(
              cp.startMonth,
              cp.startYear,
              cp.endMonth,
              cp.endYear
            ),
            isOnline: cp.isOnline,
            isLocked: cp.isLock,
          })),
        })
      ),
      nextCursor: hasMore ? fiscalPeriods[limit].id : undefined,
    };
  }

}
