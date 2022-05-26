import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import { carCreateMock } from '../mocks/carMock';

describe('1 - Car Services Test', () => {
  let carService = new CarService();

  describe('1.1 - "create" method:', () => {
    before(() => {
      Sinon.stub(carService.model, 'create').resolves(carCreateMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('a) should return a Car object with the "_id" property', async () => {
      const carCreated = await carService.create(carCreateMock);
      expect(carCreated).to.be.an('object');
      expect(carCreated).to.have.property('_id');
      expect(carCreated).to.deep.equal(carCreateMock);
    });
  });
});
