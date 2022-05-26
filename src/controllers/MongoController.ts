import { Request, Response } from 'express';
import { ZodError } from 'zod';
import Errors from '../enums/enumErrors';
import MongoService from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class MongoController<T> {
  protected errors = Errors;

  constructor(protected service: MongoService<T>, public route: string) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();

      return res.json(cars);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors });
      }
      return res.status(500).json({ error: this.errors.internalError });
    }
  };
}

export default MongoController;
