/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from 'express';

import StatisticsController, {
  type ISetDeviceInfoBody,
} from './StatisticsController';

const StatisticsRouter = Router();

/**
 * POST
 */
StatisticsRouter.post('/deviceinfo', req => {
  const controller = new StatisticsController();
  return controller.setDeviceInfo(req, req.body as ISetDeviceInfoBody);
});

export default StatisticsRouter;
