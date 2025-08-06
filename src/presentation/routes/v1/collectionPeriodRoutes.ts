import { FastifyInstance } from "fastify";
import { CollectionPeriodController } from "../../controllers/CollectionPeriodController";
import { PrismaCollectionPeriodRepository } from "../../../infrastructure/repositories/CollectionPeriodPrismaRepository";
import { CreateCollectionPeriodService } from "../../../application/collectionPeriod/service/CreateCollectionPeriodService";
import { GetGroupedCollectionPeriodsService } from "../../../application/collectionPeriod/query/GetGroupedCollectionPeriodsService";
import { createCollectionPeriodSchema } from "../../../application/collectionPeriod/dto/CollectionPeriodDTO";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GetFiscalByIdPeriodService } from "../../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";
import { PrismaFiscalPeriodRepository } from "../../../infrastructure/repositories/FiscalPeriodPrismaRepository";
import { authMiddleware } from "../../../middleware/auth";

const createBodySchema = zodToJsonSchema(createCollectionPeriodSchema);

const collectionPeriodCreateSwaggerSchema = {
  body: createBodySchema,

  tags: ["Collection-period"],
  summary: "Create Collection Period",
  description: "สร้าง Collection period",
  security: [{ bearerAuth: [] }],
};
export async function collectionPeriodRoutes(app: FastifyInstance) {
  const collectionPeriodRepository = new PrismaCollectionPeriodRepository();
  const fiscalPeriodRepository = new PrismaFiscalPeriodRepository();

  const createUseCase = new CreateCollectionPeriodService(
    collectionPeriodRepository
  );
  const getGroupedUseCase = new GetGroupedCollectionPeriodsService(
    collectionPeriodRepository
  );

  const getFiscalById = new GetFiscalByIdPeriodService(fiscalPeriodRepository);

  const controller = new CollectionPeriodController(
    createUseCase,
    getGroupedUseCase,
    getFiscalById
  );

  // app.addHook("preHandler", authMiddleware);

  app.post(
    "/",
    {
      schema: collectionPeriodCreateSwaggerSchema,
    },
    controller.create
  );

  // Route to get grouped collection periods
  app.get("/grouped", controller.getGrouped);
}
