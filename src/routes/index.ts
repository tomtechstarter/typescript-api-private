import { Router } from 'express';
import TodosRouter from './todos';
import StatisticsRouter from './stats/StatisticsRouter';

const AppRouter = Router();

AppRouter.use('/todos', TodosRouter);
AppRouter.use('/stats', StatisticsRouter);

AppRouter.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

export default AppRouter;
