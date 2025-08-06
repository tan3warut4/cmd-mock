import { FiscalPeriod } from "@prisma/client";
import { FiscalNotFoundError } from "../../../application/fiscalPeriod/error";
import { GetFiscalByIdPeriodService } from "../../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";

describe("GetFiscalByIdPeriodService", () => {
  let mockRepo: { getById: jest.Mock };
  let service: GetFiscalByIdPeriodService;

  beforeEach(() => {
    mockRepo = {
      getById: jest.fn(),
    };
    service = new GetFiscalByIdPeriodService(mockRepo as any);
  });

  it("should return fiscal period when found", async () => {
    const id = "123";
    const mockFiscalPeriod: FiscalPeriod = {
      id,
      name: { en: "FY 2025" },
      tenantId: "tenant-abc",
      startMonth: 1,
      endMonth: 12,
      startYear: 2025,
      endYear: 2025,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.getById.mockResolvedValue(mockFiscalPeriod);

    const result = await service.execute(id);

    expect(mockRepo.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockFiscalPeriod);
  });

  it("should throw FiscalNotFoundError if not found", async () => {
    const id = "not-found-id";
    mockRepo.getById.mockResolvedValue(null);

    await expect(service.execute(id)).rejects.toThrow(FiscalNotFoundError);
  });
});
