import { ICollectionPeriodRepository } from "../../../domain/collectionPeriod/repositories/ICollectionPeriodRepository";

export class GetGroupedCollectionPeriodsService {
    constructor(private readonly repo: ICollectionPeriodRepository) { }

    async execute(params: {
        tenantId: string;
        limit?: number;
        cursor?: string;
    }) {
        const { tenantId, limit = 10, cursor } = params;
        return this.repo.findGroupedByFiscal({ tenantId, limit, cursor });
    }
}
