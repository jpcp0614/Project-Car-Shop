import { Document, Schema } from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';

export interface CarDocument extends ICar, Document {}

export const carSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
});

// consulta em Course: // consulta em Course Trybe: https://app.betrybe.com/course/back-end/mongodb-com-nodejs-e-poo/mongodb-e-poo/91006798-2877-4004-9cf5-d2d72a859272/conteudos/36237ca5-7ba2-40e3-9cb7-5af2159d3bef/models/563b39d4-a90c-40c7-8f69-cc019c8ad1e8?use_case=side_bar