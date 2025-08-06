import z from "zod";
import { noEmojiRegex } from "../../../shared/regex";

export const createCollectionPeriodSchema = z
  .object({
    name: z.object({
      en: z
        .string()
        .trim()
        .min(1, "must insert name in english")
        .max(100, "name eng must less than 100"),
      th: z.string().trim().max(100, "name th must less than 100").optional(),
    }),
    fiscalPeriodId: z.string().uuid("id must be uuid"),

    startMonth: z.number().int().min(1).max(12),
    endMonth: z.number().int().min(1).max(12),
    startYear: z.number().min(1).max(3000),
    endYear: z.number().min(1).max(3000),
    isOnline: z.boolean(),
    isLock: z.boolean(),
    additionalInfo: z.string().optional(),
    createdBy: z.string().trim().max(50, "createdBy must less than 50"),
  })
  .refine(
    (data) => {
      const start = data.startYear * 12 + data.startMonth;
      const end = data.endYear * 12 + data.endMonth;
      return start < end;
    },
    {
      message: "Start date must be before end date",
      path: ["startMonth"],
    }
  );
export type createCollectionPeriodDto = z.infer<
  typeof createCollectionPeriodSchema
>;
