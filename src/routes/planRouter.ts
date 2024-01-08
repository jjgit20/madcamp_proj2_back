import express, {type RequestHandler} from 'express';
import multer from 'multer';

import * as planController from '../controller/planController';
import {authenticate} from '../middleware/tokenAuth';

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.get('/', planController.getPlans as RequestHandler);
router.get(
  '/:planId',
  authenticate as RequestHandler,
  planController.getOnePlan as RequestHandler,
);

router.post(
  '/',
  authenticate as RequestHandler,
  upload.single('image'),
  planController.createPlan as RequestHandler,
);
router.patch(
  '/:planId',
  authenticate as RequestHandler,
  upload.single('image'),
  planController.modifyPlan as RequestHandler,
);
router.delete(
  '/:planId',
  authenticate as RequestHandler,
  planController.deletePlan as RequestHandler,
);

router.patch(
  '/:planId/isPublic',
  authenticate as RequestHandler,
  planController.modifyPlanPublic as RequestHandler,
);
router.patch(
  '/:planId/isComplete',
  authenticate as RequestHandler,
  planController.modifyPlanComplete as RequestHandler,
);

router.post(
  '/:planId/fork',
  authenticate as RequestHandler,
  planController.forkPlan as RequestHandler,
);
router.patch(
  '/:planId/like',
  authenticate as RequestHandler,
  planController.likePlan as RequestHandler,
);

module.exports = router;
