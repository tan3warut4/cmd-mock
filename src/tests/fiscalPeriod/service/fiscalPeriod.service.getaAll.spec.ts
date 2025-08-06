import { FiscalPeriod } from "@prisma/client";
import { GetAllFiscalPeriodService } from "../../../application/fiscalPeriod/service/GetAllFiscalsPeriodService";
import { SortDirection } from "../../../shared/types/sortDirection";

describe("GetAllFiscalPeriodService", () => {
  let mockRepo: { getAll: jest.Mock };
  let service: GetAllFiscalPeriodService;

  beforeEach(() => {
    mockRepo = {
      getAll: jest.fn(),
    };
    service = new GetAllFiscalPeriodService(mockRepo as any);
  });

  it("should return all fiscal periods with correct order", async () => {
    const orderBy: Record<string, SortDirection>[] = [
      { startYear: "desc" },
      { startMonth: "desc" },
    ];

    const mockData: FiscalPeriod[] = [
      {
        id: "1",
        name: { en: "FY 2024" },
        tenantId: "tenant-123",
        startMonth: 1,
        endMonth: 12,
        startYear: 2024,
        endYear: 2024,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockRepo.getAll.mockResolvedValue(mockData);

    const result = await service.execute(orderBy);

    expect(mockRepo.getAll).toHaveBeenCalledWith(orderBy);
    expect(result).toEqual(mockData);
  });
});
