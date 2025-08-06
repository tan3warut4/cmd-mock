import { FiscalPeriodController } from "../../../presentation/controllers/FiscalPeriodController";

const mockReply = () => {
  const reply: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return reply;
};

const mockRequest = (data: Partial<any>): any => data;
describe("FiscalPeriodController - getById", () => {
  let controller: FiscalPeriodController;
  let mockGetByIdService: any;

  beforeEach(() => {
    mockGetByIdService = { execute: jest.fn() };
    controller = new FiscalPeriodController(
      {} as any,
      {} as any,
      mockGetByIdService
    );
  });

  it("should return fiscal period by id", async () => {
    const request = mockRequest({
      params: { id: "ab728015-4538-4222-bba8-f192bddc223c" },
    });

    const reply = mockReply();

    const fakeResult = {
      id: "ab728015-4538-4222-bba8-f192bddc223c",
      startYear: 2025,
    };
    mockGetByIdService.execute.mockResolvedValue(fakeResult);

    await controller.getById(request, reply);

    expect(mockGetByIdService.execute).toHaveBeenCalledWith(
      "ab728015-4538-4222-bba8-f192bddc223c"
    );
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith({
      data: fakeResult,
      message: "fetch successfully",
    });
  });

  it("should return 400 if validation fails", async () => {
    const request = mockRequest({
      params: { id: 123 }, // invalid, not string
    });

    const reply = mockReply();

    await controller.getById(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
  });
});
