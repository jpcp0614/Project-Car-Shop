import { Request, Response } from 'express';
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

  public create = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;

      const carCreated = await this.service.create(body);

      return res.status(201).json(carCreated);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internalError });
    }
  };
}

export default MongoController;
