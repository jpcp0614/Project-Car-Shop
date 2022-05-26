import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
import server from '../../../server';
import { carCreateMock, carResolveMock, carFindResolveMock } from '../mocks/carMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Car Controllers Test in route...', () => {
  let chaiHttpResponse: Response;
  let carModel = new CarModel();
  let app = server.getApp();

  describe('1.1 - method POST /cars:', () => {
    before(async () => {
      sinon.stub(carModel.model, 'create').resolves(carResolveMock);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('a) should return a Car object and status 201', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send(carCreateMock)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(201);
          expect(res.body).to.deep.equal(carResolveMock);
          return res.body;
        });
    });

    it('b) should return error with status 400 - model required', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send({
          year: 1963,
          color: "red",
          buyValue: 3500000,
          seatsQty: 2,
          doorsQty: 2
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error.model[0]).to.deep.equal('Required');
          return res.body;
        });
    });
  });

  describe('1.2 - method GET /cars:', () => {
    before(async () => {
      sinon.stub(carModel.model, 'find').resolves(carFindResolveMock as any[]);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return an array of Cars and status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/cars')
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(carFindResolveMock);
          return res.body;
        });
    });
  });

  describe('1.3 - method GET /cars/:id:', () => {
    before(async () => {
      sinon.stub(carModel.model, 'findOne').resolves(carResolveMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object and status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/cars/${carResolveMock._id}`)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(carResolveMock);
          return res.body;
        });
    });
  });

  describe('1.4 - method PUT /cars/:id:', () => {
    before(async () => {
      sinon.stub(carModel.model, 'findOneAndUpdate').resolves(carResolveMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) should return a Car object and status 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put(`/cars/${carResolveMock._id}`)
        .send(carCreateMock)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(carResolveMock);
          return res.body;
        });
    });
  });
});