import { expect } from 'chai';
import * as sinon from 'sinon';
import CarService from '../../../services/CarService';
import { carFindResolveMock, carResolveMock } from '../mocks/carMock';

describe('1 - Car Services Test in route...', () => {
  let carService = new CarService();

  describe('1.1 - method POST /cars:', () => {
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

  describe('1.2 - method GET /cars:', () => {
    before(() => {
      sinon.stub(carService.model, 'read').resolves(carFindResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return an array of Cars', async () => {
      const carsFound = await carService.read();
      expect(carsFound).to.be.an('array');
      expect(carsFound).to.deep.equal(carFindResolveMock);
    });
  });

  describe('1.2 - method GET /cars/:id:', () => {
    before(() => {
      sinon.stub(carService.model, 'readOne').resolves(carResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object', async () => {
      const carFound = await carService.readOne(carResolveMock._id);
      expect(carFound).to.be.an('object');
      expect(carFound).to.deep.equal(carResolveMock);
    });
  });

  describe('1.3 - method GET /cars/:id: notFound', () => {
    before(() => {
      sinon.stub(carService.model, 'readOne').resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return null', async () => {
      const carFound = await carService.readOne('4edd40c86762e0fb12000003');
      expect(carFound).to.be.null;
    });
  });

  describe('1.4 - method PUT /cars/:id:', () => {
    before(() => {
      sinon.stub(carService.model, 'update').resolves(carResolveMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object', async () => {
      const carFound = await carService.update(carResolveMock._id, carResolveMock);
      expect(carFound).to.be.an('object');
      expect(carFound).to.deep.equal(carResolveMock);
    });
  });
});
