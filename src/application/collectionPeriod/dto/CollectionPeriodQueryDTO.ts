import z from "zod";

export const getGroupedCollectionPeriodsQuerySchema = z.object({
    tenantId: z.string().min(1, "tenantId is required"),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 10))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "limit must be a positive number",
        }),
});

export const findAllCollectionPeriodsQuerySchema = z.object({
    search: z.string().optional(),
    status: z.enum(["Online", "Offline"]).optional(),
    lock: z.enum(["Locked", "Unlocked"]).optional(),
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 10)),
});

export type GetGroupedCollectionPeriodsQuery = z.infer<
    typeof getGroupedCollectionPeriodsQuerySchema
>;
export type FindAllCollectionPeriodsQuery = z.infer<
    typeof findAllCollectionPeriodsQuerySchema
>;
