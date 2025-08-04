import { z } from "zod";

export const createMonitorSchema = z.object({
  name: z.string().trim().min(1, { message: "Name, if provided, must be at least 1 character long" }).optional(),
  url: z.url({
    message: "Please provide a valid URL (e.g. https://www.example.com)"
  }),
  interval: z.number().min(10).max(3600).describe("Interval in seconds (min: 10, max: 3600)")
});
