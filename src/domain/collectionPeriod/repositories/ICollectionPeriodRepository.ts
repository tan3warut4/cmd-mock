import { CollectionPeriod } from "@prisma/client";
import { createCollectionPeriodDto } from "../../../application/collectionPeriod/dto/CollectionPeriodDTO";

export interface ICollectionPeriodRepository {

  create(period: createCollectionPeriodDto): Promise<CollectionPeriod>;

  findAll(params: {
    search?: string;
    status?: string;
    lock?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: CollectionPeriod[]; total: number }>;

  findGroupedByFiscal(params: {
    tenantId: string;
    limit: number;
    cursor?: string;
  }): Promise<{
    data: {
      fiscalPeriodId: string;
      fiscalPeriod: string;
      collectionPeriods: {
        id: string;
        name: Record<string, string>;
        term: string;
        isOnline: boolean;
        isLocked: boolean;
      }[];
    }[];
    nextCursor?: string;
  }>;
}
