import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMock } from './carMock';

describe('1 - Car Models Test', () => {
  let carModel = new CarModel();

  describe('1.1 - "create" method:', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(carMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('a) should return a Car object with the "_id" property', async () => {
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.be.an('object');
      expect(carCreated).to.have.property('_id');
      expect(carCreated).to.deep.equal(carMock);
    })
  });
});