import { Router } from 'express';
import MongoController from '../controllers/MongoController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRouter = (
    controller: MongoController<T>,
    route: string = controller.route,
  ) => {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
  };
}

export default CustomRouter;

// consulta em Course: https://app.betrybe.com/course/back-end/mongodb-com-nodejs-e-poo/mongodb-e-poo/91006798-2877-4004-9cf5-d2d72a859272/conteudos/36237ca5-7ba2-40e3-9cb7-5af2159d3bef/routes/c25fcafa-eade-47dc-8101-bf255755e9c7?use_case=side_bar