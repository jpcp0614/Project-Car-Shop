import { Response } from 'express';
import { ZodError } from 'zod';
import { Car as ICar, carZodSchema } from '../interfaces/CarInterface';
import CarService from '../services/CarService';
import MongoController, {
  RequestWithBody,
  ResponseError,
} from './MongoController';

class CarController extends MongoController<ICar> {
  constructor(protected service = new CarService()) {
    super(service, '/cars');
  }

  public create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      carZodSchema.parse(body);

      const carCreated = await this.service.create(body);

      return res.status(201).json(carCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.flatten().fieldErrors });
      }
      console.log(error);
      return res.status(500).json({ error: this.errors.internalError });
    }
  };
}

export default CarController;

// consulta em video Isaac: https://vimeo.com/713501130/b50a92c1f8