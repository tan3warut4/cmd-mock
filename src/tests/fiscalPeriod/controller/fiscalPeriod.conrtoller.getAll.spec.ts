import { FiscalPeriodController } from "../../../presentation/controllers/FiscalPeriodController";

const mockReply = () => {
  const reply: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return reply;
};

const mockRequest = (data: Partial<any>): any => data;
describe("FiscalPeriodController - getAll", () => {
  let controller: FiscalPeriodController;
  let mockGetAllService: any;

  beforeEach(() => {
    mockGetAllService = { execute: jest.fn() };
    controller = new FiscalPeriodController(
      {} as any,
      mockGetAllService,
      {} as any
    );
  });

  it("should return list of fiscal periods", async () => {
    const request = mockRequest({
      query: { sort: "startYear:desc" },
    });

    const reply = mockReply();

    const mockData = [{ id: "1", startYear: 2024 }];
    mockGetAllService.execute.mockResolvedValue(mockData);

    await controller.getAll(request, reply);

    expect(mockGetAllService.execute).toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      data: mockData,
      message: "fetch successfully",
    });
  });
});
