import CustomRouter from './routes/routes';
import App from './app';
import CarController from './controllers/CarController';
import { Car as ICar } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<ICar>();
carRouter.addRouter(carController);

server.addRouter(carRouter.router);

export default server;
