import { z } from "zod";

export const createMonitorSchema = z.object({
  name: z.string().trim().optional().refine(val => val === undefined || val.length > 0, {
    message: "Name if provided must be at least 1 character long"
  }),
  url: z.url({
    message: "Please provide a valid URL (e.g. https://www.example.com)"
  }),
  // Interval in seconds: minimum 10 seconds, maximum 3600 seconds (1 hour)
  interval: z.number().min(10).max(3600).describe("Interval in seconds (min: 10, max: 3600)")
});
