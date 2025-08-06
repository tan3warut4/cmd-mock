import z from "zod";

export const createFiscalPeriodSchema = z
  .object({
    name: z
      .object({
        en: z
          .string()
          .trim()
          .min(1, "must insert name in english")
          .max(100, "name eng must less than 100"),
        th: z.string().trim().max(100, "name th must less than 100").optional(),
      })
      .optional(),
    tenantId: z.string().uuid("id must be uuid"),
    startMonth: z.number().int().min(1).max(12),
    endMonth: z.number().int().min(1).max(12),
    startYear: z.number().min(1).max(3000),
    endYear: z.number().min(1).max(3000),
  })
  .refine(
    (data) => {
      const start = data.startYear * 12 + data.startMonth; // แปลงปี+เดือนให้เป็นจำนวน "เดือนทั้งหมด"
      const end = data.endYear * 12 + data.endMonth;
      return start < end;
    },
    {
      message: "Start date must be before end date",
      path: ["startMonth"],
    }
  );
export type createFiscalPeriodDto = z.infer<typeof createFiscalPeriodSchema>;

export const getFiscalPeriodByIdSchema = z.object({
  id: z.string().uuid("id must be uuid"),
});
export type getFiscalPeriodByIdDto = z.infer<typeof getFiscalPeriodByIdSchema>;
