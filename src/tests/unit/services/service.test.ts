import { expect } from 'chai';
import * as sinon from 'sinon';
import CarService from '../../../services/CarService';
import { carResolveMock } from '../mocks/carMock';

describe('1 - Car Services Test in route /cars', () => {
  let carService = new CarService();

  describe('1.1 - "create" method:', () => {
    before(() => {
      sinon.stub(carService.model, 'create').resolves(carResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object with the "_id" property', async () => {
      const carCreated = await carService.create(carResolveMock);
      expect(carCreated).to.be.an('object');
      expect(carCreated).to.have.property('_id');
      expect(carCreated).to.deep.equal(carResolveMock);
    });
  });
});
