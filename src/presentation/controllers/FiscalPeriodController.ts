import { FastifyRequest, FastifyReply } from "fastify";
import { CreateFiscalPeriodService } from "../../application/fiscalPeriod/service/CreateFiscalPeriodService";
import {
  createFiscalPeriodSchema,
  getFiscalPeriodByIdSchema,
} from "../../application/fiscalPeriod/dto/FiscalPeriodSchema";
import { GetAllFiscalPeriodService } from "../../application/fiscalPeriod/service/GetAllFiscalsPeriodService";
import { GetFiscalByIdPeriodService } from "../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";
import { FiscalNotFoundError } from "../../application/fiscalPeriod/error";
import { SortDirection } from "../../shared/types/sortDirection";

const parseSortQuery = (sortQuery: string | undefined) => {
  if (!sortQuery)
    return [
      { startYear: "desc" as SortDirection },
      { startMonth: "desc" as SortDirection },
    ];

  const fields = sortQuery.split(",").map((part) => {
    const [field, direction = "asc"] = part.split(":");
    const dir = direction.toLowerCase() as SortDirection;
    if (!["asc", "desc"].includes(dir) || !field) return null;
    return { [field]: dir };
  });

  // remove invalid values
  return fields.filter(Boolean) as Record<string, SortDirection>[];
};
export class FiscalPeriodController {
  constructor(
    private readonly createUseCase: CreateFiscalPeriodService,

    private readonly getAllUseCase: GetAllFiscalPeriodService,
    private readonly getByIdUseCase: GetFiscalByIdPeriodService
  ) {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      //TODO change get tenatID from body to jwt
      const payload = createFiscalPeriodSchema.safeParse(request.body);
      if (!payload.success) {
        return reply.status(400).send(JSON.parse(payload.error.message));
      }

      const data = await this.createUseCase.execute({
        ...payload.data,
      });
      return reply
        .status(201)
        .send({ data: data, message: "created successfully" });
    } catch (error: any) {
      return reply
        .status(500)
        .send({ error: "Internal Error", message: error.message });
    }
  };

  getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = request.query as { sort?: string };

      const orderBy = parseSortQuery(query.sort);
      const data = await this.getAllUseCase.execute(orderBy);
      return reply
        .status(200)
        .send({ data: data, message: "fetch successfully" });
    } catch (error: any) {
      return reply
        .status(500)
        .send({ error: "Internal Error", message: error.message });
    }
  };
  getById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = getFiscalPeriodByIdSchema.safeParse(request.params);
      if (!payload.success) {
        return reply.status(400).send(JSON.parse(payload.error.message));
      }
      const data = await this.getByIdUseCase.execute(payload.data.id);

      return reply
        .status(200)
        .send({ data: data, message: "fetch successfully" });
    } catch (error: any) {
      if (error instanceof FiscalNotFoundError) {
        return reply
          .status(error.statusCode)
          .send({ error: error.name, message: error.message });
      }
      return reply
        .status(500)
        .send({ error: "Internal Error", message: error.message });
    }
  };
}
