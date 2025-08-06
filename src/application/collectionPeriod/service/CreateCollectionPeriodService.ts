import { CollectionPeriod, FiscalPeriod } from "@prisma/client";
import { ICollectionPeriodRepository } from "../../../domain/collectionPeriod/repositories/ICollectionPeriodRepository";
import { createCollectionPeriodDto } from "../dto/CollectionPeriodDTO";
import { CollectionPeriodOutOfRangError } from "../error";

export class CreateCollectionPeriodService {
  constructor(private repo: ICollectionPeriodRepository) {}

  async execute(
    data: createCollectionPeriodDto,
    fiscalData: FiscalPeriod
  ): Promise<CollectionPeriod> {
    // แปลง start และ end เป็นตัวเลขง่าย ๆ เพื่อเทียบ (YYYYMM)
    const fiscalStart = fiscalData.startYear * 100 + fiscalData.startMonth;
    const fiscalEnd = fiscalData.endYear * 100 + fiscalData.endMonth;

    const collectionStart = data.startYear * 100 + data.startMonth;
    const collectionEnd = data.endYear * 100 + data.endMonth;

    // ตรวจสอบว่า collectionPeriod ต้องอยู่ภายในช่วง fiscalPeriod เท่านั้น
    if (collectionStart < fiscalStart || collectionEnd > fiscalEnd) {
      throw new CollectionPeriodOutOfRangError(fiscalData);
    }

    return this.repo.create(data);
  }
}
