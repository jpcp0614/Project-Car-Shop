import MongoModel from '../models/MongoModel';

abstract class MongoService<T> {
  constructor(protected model: MongoModel<T>) {}

  public create = async (object: T): Promise<T> =>
    this.model.create(object);

  public read = async (): Promise<T[]> =>
    this.model.read();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.readOne(id);

  public update = async (id: string, object: T): Promise<T | null> =>
    this.model.update(id, object);
}

export default MongoService;

// consulta em Course: https://app.betrybe.com/course/back-end/mongodb-com-nodejs-e-poo/mongodb-e-poo/91006798-2877-4004-9cf5-d2d72a859272/conteudos/36237ca5-7ba2-40e3-9cb7-5af2159d3bef/services/f053c162-8d47-41e2-9053-9eeba07a3bd3?use_case=side_bar