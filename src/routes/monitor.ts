import { z } from "zod";

export const createMonitorSchema = z.object({
  name: z.string().min(1),
  url: z.url({
    message: "Invalid URL"
  }),
  // Interval in seconds: minimum 10 seconds, maximum 3600 seconds (1 hour)
  interval: z.number().min(10).max(3600).describe("Interval in seconds (min: 10, max: 3600)")
});