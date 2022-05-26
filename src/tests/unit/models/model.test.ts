import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carResolveMock } from '../mocks/carMock';

describe('1 - Car Models Test in route /cars', () => {
  let carModel = new CarModel();

  describe('1.1 - "create" method:', () => {
    before(() => {
      sinon.stub(carModel.model, 'create').resolves(carResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object with the "_id" property\n', async () => {
      const carCreated = await carModel.create(carResolveMock);
      expect(carCreated).to.be.an('object');
      expect(carCreated).to.have.property('_id');
      expect(carCreated).to.deep.equal(carResolveMock);
    })
  });
});