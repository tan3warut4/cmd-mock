import { FiscalPeriod } from "@prisma/client";
import { createFiscalPeriodDto } from "../../../application/fiscalPeriod/dto/FiscalPeriodSchema";
import { CreateFiscalPeriodService } from "../../../application/fiscalPeriod/service/CreateFiscalPeriodService";
import assert from "assert";
import { GetAllFiscalPeriodService } from "../../../application/fiscalPeriod/service/GetAllFiscalsPeriodService";
import { GetFiscalByIdPeriodService } from "../../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";
import { DatabaseClient } from "../../../infrastructure/database/DatabaseClient";
import { PrismaFiscalPeriodRepository } from "../../../infrastructure/repositories/FiscalPeriodPrismaRepository";

describe("CreateFiscalPeriodService", () => {
  let mockRepo: { create: jest.Mock };
  let service: CreateFiscalPeriodService;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
    };
    service = new CreateFiscalPeriodService(mockRepo as any);
  });

  it("should call repo.create with given data and return the result", async () => {
    const dto: createFiscalPeriodDto = {
      name: { en: "FY 2025", th: "ปีงบประมาณ 2568" },
      tenantId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
      startMonth: 1,
      endMonth: 12,
      startYear: 2025,
      endYear: 2025,
    };

    const expectedResult: FiscalPeriod = {
      id: "some-id",
      ...dto,
      name: { en: "FY 2025", th: "ปีงบประมาณ 2568" },

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.create.mockResolvedValue(expectedResult);

    const result = await service.execute(dto);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});

describe("FiscalPeriodService (Integration)", () => {
  const repo = new PrismaFiscalPeriodRepository();
  const createService = new CreateFiscalPeriodService(repo);
  const getAllService = new GetAllFiscalPeriodService(repo);
  const getByIdService = new GetFiscalByIdPeriodService(repo);
  const prisma = DatabaseClient.getInstance();

  beforeEach(async () => {
    await prisma.fiscalPeriod.deleteMany();
  });
  afterEach(async () => {
    await prisma.fiscalPeriod.deleteMany();
  });

  it("should create and retrieve a fiscal period", async () => {
    const payload = {
      tenantId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
      startMonth: 10,
      endMonth: 9,
      startYear: 2025,
      endYear: 2026,
      name: { en: "FY25/26" },
    };

    const created = await createService.execute(payload);
    const found = await getByIdService.execute(created.id);
    if (found) {
      expect(found.id).toBe(created.id);
      expect(found.startMonth).toBe(10);
      expect(found.endMonth).toBe(9);
    } else {
      assert("create error");
    }
  });

  it("should get all fiscal periods", async () => {
    await createService.execute({
      tenantId: "uuid-1",
      startMonth: 1,
      endMonth: 12,
      startYear: 2022,
      endYear: 2022,
      name: { en: "FY2022" },
    });

    await createService.execute({
      tenantId: "uuid-2",
      startMonth: 1,
      endMonth: 12,
      startYear: 2023,
      endYear: 2023,
      name: { en: "FY2023" },
    });

    const results = await getAllService.execute([{ startYear: "desc" }]);
    expect(results.length).toBe(2);
    expect(results[0].startYear).toBe(2023);
  });
});
