import { z } from 'zod';
import { vehicleZodSchema } from './VehicleInterface';

export const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type Car = z.infer<typeof carZodSchema>;

// consulta em documentação: https://github.com/colinhacks/zod#extend