import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30),
  description: z.string().max(120).optional(),
  latitude: z
    .string()
    .regex(/^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?))$/, {
      message: "Latitude must be a value between -90 and 90",
    })
    .trim(),
  longitude: z
    .string()
    .regex(/^([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/, {
      message: "Longitude must be a value between -180 and 180.",
    })
    .trim(),
  city: z.string().max(20),
  pincode: z
    .string()
    .max(6)
    .regex(/^[0-9]+$/, {
      message: "Pincode must be a number",
    }),
  fullAddress: z.string().optional(),
});

export const createResTypeTimeSchema = z.object({
  type: z.enum(["DINEIN", "DELIVERY", "BOTH"], {
    required_error: "You need to select a type.",
  }),
  categories: z
    .array(z.string())
    .max(2, {
      message: "You can select up to 2 categories",
    })
    .refine((categories) => categories.some((category) => category), {
      message: "You need to select at least 1 category",
    }),
  cuisines: z
    .array(z.string())
    .max(2, {
      message: "You can select up to 2 cuisines",
    })
    .refine((cuisines) => cuisines.some((cuisine) => cuisine), {
      message: "You need to select at least 1 cuisine",
    }),
  open: z.string(),
  close: z.string(),
  days: z.array(z.string()).refine((days) => days.some((day) => day), {
    message: "You need to select at least 1 open day",
  }),
});

export type CreateResTypeTime = z.infer<typeof createResTypeTimeSchema>;

export type CreateRestaurant = z.infer<typeof createRestaurantSchema>;
