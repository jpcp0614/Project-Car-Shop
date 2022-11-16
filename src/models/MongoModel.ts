import { Document, Model as MModel } from 'mongoose';
import { Model as IModel } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: MModel<T & Document>) {}

  public create = async (object: T): Promise<T> =>
    this.model.create({ ...object });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  public update = async (id: string, object: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id: id }, { ...object }, { new: true });

  public delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}

export default MongoModel;

// consulta em Course Trybe: https://app.betrybe.com/course/back-end/mongodb-com-nodejs-e-poo/mongodb-e-poo/91006798-2877-4004-9cf5-d2d72a859272/conteudos/36237ca5-7ba2-40e3-9cb7-5af2159d3bef/models/563b39d4-a90c-40c7-8f69-cc019c8ad1e8?use_case=side_bar
// consulta em Course Aula ao vivo: https://app.betrybe.com/course/live-lectures/sd-cohort-15-b#aula-302-mongodb-e-poo