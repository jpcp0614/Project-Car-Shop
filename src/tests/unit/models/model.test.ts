import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carResolveMock, carFindResolveMock } from '../mocks/carMock';

describe('1 - Car Models Test in route...', () => {
  let carModel = new CarModel();

  describe('1.1 - method POST /cars:', () => {
    before(() => {
      sinon.stub(carModel.model, 'create').resolves(carResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object with the "_id" property', async () => {
      const carCreated = await carModel.create(carResolveMock);
      expect(carCreated).to.be.an('object');
      expect(carCreated).to.have.property('_id');
      expect(carCreated).to.deep.equal(carResolveMock);
    })
  });

  describe('1.2 - method GET /cars:', () => {
    before(() => {
      sinon.stub(carModel.model, 'find').resolves(carFindResolveMock as any[]);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return an array of Cars', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.an('array');
      expect(carsFound).to.deep.equal(carFindResolveMock);
    });
  });

  describe('1.3 - method GET /cars/:id:', () => {
    before(() => {
      sinon.stub(carModel.model, 'findOne').resolves(carResolveMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object', async () => {
      const carFound = await carModel.readOne(carResolveMock._id);
      expect(carFound).to.be.an('object');
      expect(carFound).to.deep.equal(carResolveMock);
    });
  });
});