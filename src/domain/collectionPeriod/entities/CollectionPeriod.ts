export class CollectionPeriod {
  constructor(
    public readonly id: string,
    public readonly fiscalPeriodId: string,
    public readonly startMonth: number,
    public readonly startYear: number,
    public readonly name: { en: string; th: string },
    public readonly isOnline: boolean,
    public readonly isLocked: boolean,
    public readonly additionalInfo?: string,
    public readonly createdBy?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
