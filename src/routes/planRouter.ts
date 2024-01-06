import express, {type RequestHandler} from 'express';

import * as planController from '../controller/planController';

const router = express.Router();

router.get('/', planController.getPlans as RequestHandler); // tested
router.post('/', planController.createPlan as RequestHandler);
router.get('/:planId', planController.getOnePlan as RequestHandler); // tested
router.patch('/:planId', planController.modifyPlan as RequestHandler);
router.patch(
  '/:planId/isPublic',
  planController.modifyPlanPublic as RequestHandler,
);

module.exports = router;
