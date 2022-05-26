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

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}

export default MongoController;
