import { z } from "zod";

export const createMonitorSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  interval: z.number().min(10).max(3600)
});