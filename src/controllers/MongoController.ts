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

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}

export default MongoController;

// consulta em Course: https://app.betrybe.com/course/back-end/mongodb-com-nodejs-e-poo/mongodb-e-poo/91006798-2877-4004-9cf5-d2d72a859272/conteudos/36237ca5-7ba2-40e3-9cb7-5af2159d3bef/controllers/50c899c8-2aaa-4c89-85aa-8ae2ba7b25ee?use_case=side_bar
