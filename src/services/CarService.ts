import { Car as ICar } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';
import MongoService from './MongoService';

class CarService extends MongoService<ICar> {
  constructor(protected model = new CarModel()) {
    super(model);
  }
}

export default CarService;