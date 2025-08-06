import zodToJsonSchema from "zod-to-json-schema";
import { createFiscalPeriodSchema } from "../../application/fiscalPeriod/dto/FiscalPeriodSchema";

export const createFiscalPeriodsSwaggerSchema = {
  description: "Create fiscal periods  ",
  tags: ["FiscalPeriod"],
  body: zodToJsonSchema(createFiscalPeriodSchema),

  response: {
    201: {
      description: "Created",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            tenantId: { type: "string", format: "uuid" },
            name: {
              type: ["object", "null"],
              properties: {
                en: { type: ["string", "null"] },
                th: { type: ["string", "null"] },
              },
              required: ["en"],
            },
            startMonth: { type: "integer" },
            endMonth: { type: "integer" },
            startYear: { type: "integer" },
            endYear: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: ["string", "null"], format: "date-time" },
          },
          required: [
            "id",
            "tenantId",
            "startMonth",
            "endMonth",
            "startYear",
            "endYear",
          ],
        },
        message: { type: "string" },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

export const getAllFiscalPeriodsSwaggerSchema = {
  description: "Get all fiscal periods with optional sorting",
  tags: ["FiscalPeriod"],
  querystring: {
    type: "object",
    properties: {
      sort: {
        type: "string",
        description:
          "Sorting format: field:direction. Example: startYear:desc,startMonth:asc",
      },
    },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              tenantId: { type: "string" },
              name: {
                type: ["object", "null"],
                additionalProperties: { type: ["string", "null"] },
                example: { en: "Fiscal Year 2025", th: "ปีงบประมาณ 2568" },
              },
              startMonth: { type: "integer" },
              endMonth: { type: "integer" },
              startYear: { type: "integer" },
              endYear: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: ["string", "null"], format: "date-time" },
            },
            required: [
              "id",
              "tenantId",
              "name",
              "startMonth",
              "endMonth",
              "startYear",
              "endYear",
              "createdAt",
            ],
          },
        },
        message: { type: "string" },
      },
      required: ["data", "message"],
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

export const getFiscalPeriodByIdSwaggerSchema = {
  description: "Get fiscal period by ID",
  tags: ["FiscalPeriod"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            tenantId: { type: "string" },
            name: {
              type: "object",
              properties: {
                en: { type: "string" },
                th: { type: "string" },
              },
              required: ["en"],
            },
            startMonth: { type: "integer" },
            endMonth: { type: "integer" },
            startYear: { type: "integer" },
            endYear: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: ["string", "null"], format: "date-time" },
          },
          required: [
            "id",
            "tenantId",
            "startMonth",
            "endMonth",
            "startYear",
            "endYear",
            "createdAt",
          ],
        },
        message: { type: "string", example: "fetch successfully" },
      },
      required: ["data", "message"],
    },
    400: {
      description: "Invalid UUID or input",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
    404: {
      description: "Fiscal period not found",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};
