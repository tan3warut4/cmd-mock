import { FastifyPluginAsync } from "fastify";
import { collectionPeriodRoutes } from "./collectionPeriodRoutes";
import { fiscalPeriodRoutes } from "./fiscalPeriodRoutes";

const v1Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(fiscalPeriodRoutes, {
    prefix: "/fiscal-periods",
  });
  fastify.register(collectionPeriodRoutes, {
    prefix: "/collection-periods",
  });
};

export default v1Routes;
