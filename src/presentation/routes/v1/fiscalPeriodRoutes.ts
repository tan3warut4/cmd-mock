import { FastifyInstance } from "fastify";
import { PrismaFiscalPeriodRepository } from "../../../infrastructure/repositories/FiscalPeriodPrismaRepository";
import { CreateFiscalPeriodService } from "../../../application/fiscalPeriod/service/CreateFiscalPeriodService";
import { FiscalPeriodController } from "../../controllers/FiscalPeriodController";
import { GetAllFiscalPeriodService } from "../../../application/fiscalPeriod/service/GetAllFiscalsPeriodService";
import { GetFiscalByIdPeriodService } from "../../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";
import {
  createFiscalPeriodsSwaggerSchema,
  getAllFiscalPeriodsSwaggerSchema,
  getFiscalPeriodByIdSwaggerSchema,
} from "../../swagger/fiscalSwagger";
import { authMiddleware } from "../../../middleware/auth";

export async function fiscalPeriodRoutes(app: FastifyInstance) {
  const repository = new PrismaFiscalPeriodRepository();
  const createUseCase = new CreateFiscalPeriodService(repository);
  const getAllUseCase = new GetAllFiscalPeriodService(repository);
  const getByIdUseCase = new GetFiscalByIdPeriodService(repository);
  const controller = new FiscalPeriodController(
    createUseCase,
    getAllUseCase,
    getByIdUseCase
  );

  // app.addHook("preHandler", authMiddleware);

  app.get(
    "/",
    {
      schema: getAllFiscalPeriodsSwaggerSchema,
    },
    controller.getAll
  );

  app.get(
    "/:id",
    { schema: getFiscalPeriodByIdSwaggerSchema },
    controller.getById
  );
  app.post(
    "/",
    {
      schema: createFiscalPeriodsSwaggerSchema,
    },
    controller.create
  );
}
