import { Router } from 'express';
import TodosRouter from './todos';

const AppRouter = Router();

AppRouter.use('/todos', TodosRouter);

AppRouter.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

export default AppRouter;
