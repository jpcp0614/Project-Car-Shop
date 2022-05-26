import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
import server from '../../../server';
import { carCreateMock, carResolveMock } from '../mocks/carMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Car Controllers Test in route /cars', () => {
  let chaiHttpResponse: Response;
  let carModel = new CarModel();
  let app = server.getApp();

  describe('1.1 - "create" method:', () => {
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


});