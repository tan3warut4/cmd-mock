import { FastifyRequest, FastifyReply } from "fastify";
import { createCollectionPeriodSchema } from "../../application/collectionPeriod/dto/CollectionPeriodDTO";
import { CreateCollectionPeriodService } from "../../application/collectionPeriod/service/CreateCollectionPeriodService";
import { GetGroupedCollectionPeriodsService } from "../../application/collectionPeriod/query/GetGroupedCollectionPeriodsService";
import { GetFiscalByIdPeriodService } from "../../application/fiscalPeriod/service/GetFiscalByIdPeriodService";
import { FiscalNotFoundError } from "../../application/fiscalPeriod/error";
import { CollectionPeriodOutOfRangError } from "../../application/collectionPeriod/error";
import { Prisma } from "@prisma/client";

export class CollectionPeriodController {
  constructor(
    private readonly createUseCase: CreateCollectionPeriodService,
    private readonly getGroupedUseCase: GetGroupedCollectionPeriodsService,
    private readonly getFiscalByIdUseCase: GetFiscalByIdPeriodService
  ) {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      //TODO change get createdBy from body to jwt

      const payload = createCollectionPeriodSchema.safeParse(request.body);

      if (!payload.success) {
        return reply.status(400).send(JSON.parse(payload.error.message));
      }

      // check fiscalData
      const fiscalPeriod = await this.getFiscalByIdUseCase.execute(
        payload.data.fiscalPeriodId
      );

      const data = await this.createUseCase.execute(payload.data, fiscalPeriod);

      return reply.status(201).send({ data, message: "created successfully" });
    } catch (error: any) {
      console.log(error);
      if (error instanceof FiscalNotFoundError) {
        return reply
          .status(error.statusCode)
          .send({ error: error.name, message: error.message });
      } else if (error instanceof CollectionPeriodOutOfRangError) {
        return reply.status(error.statusCode).send({
          error: error.name,
          message: error.message,
          fiscalPeriod: error.fiscalPeriod,
        });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return reply.code(409).send({
            error: "UNIQUE_CONFLICT",
            message:
              "A CollectionPeriod with the same start and end date already exists in this FiscalPeriod.",
            meta: error.meta,
          });
        }
      }

      return reply
        .status(500)
        .send({ error: "Internal Error", message: error.message });
    }
  };

  getGrouped = async (request: FastifyRequest, reply: FastifyReply) => {
    const { tenantId, limit, cursor } = request.query as {
      tenantId: string;
      limit?: string;
      cursor?: string;
    };

    if (!tenantId) {
      return reply.status(400).send({ error: "tenantId is required" });
    }

    const parsedLimit = limit ? parseInt(limit) : undefined;
    const data = await this.getGroupedUseCase.execute({
      tenantId,
      limit: parsedLimit,
      cursor,
    });

    return reply.send(data);
  };
}
