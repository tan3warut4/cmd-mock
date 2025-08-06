import { FiscalPeriodController } from "../../../presentation/controllers/FiscalPeriodController";

const mockReply = () => {
  const reply: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return reply;
};

const mockRequest = (data: Partial<any>): any => data;
describe("FiscalPeriodController - create", () => {
  let controller: FiscalPeriodController;
  let mockCreateService: any;

  beforeEach(() => {
    mockCreateService = { execute: jest.fn() };
    controller = new FiscalPeriodController(
      mockCreateService,
      {} as any,
      {} as any
    );
  });

  it("should create fiscal period and return 201", async () => {
    const request = mockRequest({
      body: {
        tenantId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
        name: { en: "FY 2025" },
        startMonth: 1,
        endMonth: 12,
        startYear: 2025,
        endYear: 2025,
      },
    });

    const reply = mockReply();
    const fakeResponse = { id: "123", ...request.body };
    mockCreateService.execute.mockResolvedValue(fakeResponse);

    await controller.create(request, reply);

    expect(mockCreateService.execute).toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      data: fakeResponse,
      message: "created successfully",
    });
  });

  it("should return 400 when validation fails", async () => {
    const request = mockRequest({
      body: {
        tenantId: "invalid", // not uuid
        startMonth: 1,
        endMonth: 12,
        startYear: 2025,
        endYear: 2025,
      },
    });

    const reply = mockReply();

    await controller.create(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });
});
