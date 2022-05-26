import { model as createModel } from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';
import { carSchema } from '../schemas/carSchema';
import MongoModel from './MongoModel';

class CarModel extends MongoModel<ICar> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}

export default CarModel;