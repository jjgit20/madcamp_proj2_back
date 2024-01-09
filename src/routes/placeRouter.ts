import express, {type RequestHandler} from 'express';

import * as placeController from '../controller/placeController';
import {authenticate} from '../middleware/tokenAuth';

const router = express.Router();
router.post(
  '/',
  authenticate as RequestHandler,
  placeController.getPlace as RequestHandler,
);
router.post(
  '/:placeId/plans/:planId',
  authenticate as RequestHandler,
  placeController.addPlanPlace as RequestHandler,
);
router.delete(
  '/:planPlaceId',
  authenticate as RequestHandler,
  placeController.deletePlanPlace as RequestHandler,
);

module.exports = router;
