import { Application } from 'express';
import superheroRouter from './api/superhero.route';
import Validator from '../middlewares/superheroes.validator';
import ErrorHandler from '../middlewares/error.handler';

class AppRouter {
  constructor(private app: Application) {}

  superheroValidator = new Validator();

  errorHandler = new ErrorHandler();

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/superheroes', this.superheroValidator.validateBody(), superheroRouter);
  }
}

export default AppRouter;
